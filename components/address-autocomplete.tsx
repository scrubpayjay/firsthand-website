"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
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

// Using legacy Autocomplete (not PlaceAutocompleteElement) so RHF register
// and existing input styling work without shadow-DOM workarounds. Google
// guarantees the legacy class for 12+ months past its 2025 deprecation.
export const AddressAutocomplete = forwardRef<
  HTMLInputElement,
  AddressAutocompleteProps
>(function AddressAutocomplete(
  { onPlaceSelected, ...inputProps },
  forwardedRef
) {
  const localRef = useRef<HTMLInputElement>(null);
  const callbackRef = useRef(onPlaceSelected);

  useImperativeHandle(forwardedRef, () => localRef.current as HTMLInputElement);

  useEffect(() => {
    callbackRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    const input = localRef.current;
    if (!apiKey || !input) return;
    ensureLoaderOptions(apiKey);

    let listener: google.maps.MapsEventListener | null = null;
    let cancelled = false;

    importLibrary("places")
      .then((places) => {
        if (cancelled || !input) return;
        const ac = new places.Autocomplete(input, {
          types: ["address"],
          componentRestrictions: { country: "us" },
          fields: ["formatted_address", "address_components", "place_id"],
        });
        listener = ac.addListener("place_changed", () => {
          const place = ac.getPlace();
          const components = place.address_components ?? [];
          const get = (
            type: string,
            prop: "long_name" | "short_name" = "long_name"
          ): string =>
            components.find((c) => c.types.includes(type))?.[prop] ?? "";

          callbackRef.current({
            formattedAddress: place.formatted_address ?? "",
            city:
              get("locality") ||
              get("sublocality") ||
              get("postal_town"),
            state: get("administrative_area_level_1", "short_name"),
            zip: get("postal_code"),
            placeId: place.place_id ?? "",
          });
        });
      })
      .catch((err: unknown) => {
        console.error("[address-autocomplete] failed to load Places:", err);
      });

    return () => {
      cancelled = true;
      if (listener) listener.remove();
    };
  }, []);

  return <input ref={localRef} {...inputProps} />;
});
