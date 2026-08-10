"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

export type AddressSelection = {
  formattedAddress: string;
  city: string;
  state: string;
  zip: string;
  placeId: string;
};

type AddressAutocompleteProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onPlaceSelected: (selection: AddressSelection) => void;
};

let optionsSet = false;
function ensureLoaderOptions(apiKey: string) {
  if (optionsSet) return;
  setOptions({ key: apiKey, v: "weekly", libraries: ["places"] });
  optionsSet = true;
}

/**
 * Address autocomplete on the CURRENT Places API (AutocompleteSuggestion).
 *
 * Was previously google.maps.places.Autocomplete. That class — and
 * AutocompleteService with it — is closed to Google Cloud projects created
 * after 2025-03-01. It does not throw or warn: the callback simply never
 * fires, so the field silently degraded to a plain text box and customers
 * typed partial addresses by hand. Verified in-page on firsthandlawns.com:
 * the legacy call returned no callback after 8s while the modern one
 * answered immediately. Do not switch back.
 *
 * The dropdown is ours rather than a Google web component, which keeps the
 * plain <input> that react-hook-form registers onto and avoids shadow-DOM
 * styling workarounds — the reason the legacy widget was chosen originally.
 */
type Suggestion = {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prediction: any;
};

export const AddressAutocomplete = forwardRef<
  HTMLInputElement,
  AddressAutocompleteProps
>(function AddressAutocomplete(
  { onPlaceSelected, onChange, ...inputProps },
  forwardedRef
) {
  const localRef = useRef<HTMLInputElement>(null);
  const callbackRef = useRef(onPlaceSelected);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const placesRef = useRef<any>(null);
  const sessionRef = useRef<unknown>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [items, setItems] = useState<Suggestion[]>([]);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);

  useImperativeHandle(forwardedRef, () => localRef.current as HTMLInputElement);

  useEffect(() => {
    callbackRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) return;
    ensureLoaderOptions(apiKey);
    let cancelled = false;

    importLibrary("places")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((places: any) => {
        if (cancelled) return;
        placesRef.current = places;
        if (places.AutocompleteSessionToken) {
          sessionRef.current = new places.AutocompleteSessionToken();
        }
      })
      .catch((err: unknown) => {
        console.error("[address-autocomplete] failed to load Places:", err);
      });

    return () => {
      cancelled = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setItems([]);
    setActive(-1);
  }, []);

  const search = useCallback(async (value: string) => {
    const places = placesRef.current;
    if (!places?.AutocompleteSuggestion) return;
    try {
      const res = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
        {
          input: value,
          sessionToken: sessionRef.current,
          includedRegionCodes: ["us"],
          includedPrimaryTypes: ["street_address", "premise", "subpremise"],
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const next: Suggestion[] = (res.suggestions ?? []).map((s: any) => ({
        text: s.placePrediction?.text?.toString() ?? "",
        prediction: s.placePrediction,
      }));
      setItems(next);
      setActive(-1);
      setOpen(next.length > 0);
    } catch (err) {
      // Most common cause is the key's HTTP-referrer allowlist not covering
      // this domain. Log it rather than failing — the field stays typable.
      console.error("[address-autocomplete] suggestion fetch failed:", err);
      close();
    }
  }, [close]);

  const choose = useCallback(
    async (index: number) => {
      const item = items[index];
      if (!item) return;
      const input = localRef.current;
      try {
        const place = item.prediction.toPlace();
        await place.fetchFields({
          fields: ["addressComponents", "formattedAddress", "id"],
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const comps: any[] = place.addressComponents ?? [];
        const get = (type: string, short = false): string => {
          const c = comps.find((x) => x.types?.includes(type));
          return (short ? c?.shortText : c?.longText) ?? c?.longText ?? "";
        };
        const formatted = place.formattedAddress ?? item.text;
        if (input) input.value = formatted;
        callbackRef.current({
          formattedAddress: formatted,
          city: get("locality") || get("sublocality") || get("postal_town"),
          state: get("administrative_area_level_1", true),
          zip: get("postal_code"),
          placeId: place.id ?? "",
        });
      } catch (err) {
        console.error("[address-autocomplete] place details failed:", err);
        if (input) input.value = item.text;
        callbackRef.current({
          formattedAddress: item.text,
          city: "",
          state: "",
          zip: "",
          placeId: "",
        });
      }
      // Google bills per session; start a fresh one after each resolved pick.
      const places = placesRef.current;
      if (places?.AutocompleteSessionToken) {
        sessionRef.current = new places.AutocompleteSessionToken();
      }
      close();
    },
    [items, close]
  );

  return (
    <div className="relative">
      <input
        ref={localRef}
        autoComplete="off"
        {...inputProps}
        onChange={(e) => {
          onChange?.(e);
          const value = e.target.value.trim();
          if (debounceRef.current) clearTimeout(debounceRef.current);
          if (value.length < 4) {
            close();
            return;
          }
          debounceRef.current = setTimeout(() => search(value), 220);
        }}
        onKeyDown={(e) => {
          if (!open) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, items.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter" && active > -1) {
            e.preventDefault();
            void choose(active);
          } else if (e.key === "Escape") {
            close();
          }
        }}
        onBlur={() => setTimeout(close, 150)}
      />
      {open && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-border bg-background shadow-lg">
          {items.map((item, i) => (
            <li key={`${item.text}-${i}`}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  void choose(i);
                }}
                className={`block w-full px-3 py-2 text-left text-sm ${
                  i === active
                    ? "bg-muted text-foreground"
                    : "text-foreground hover:bg-muted/60"
                }`}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
