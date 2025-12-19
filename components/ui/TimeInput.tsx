import * as React from "react";
import { Input } from "@/components/ui/input";

export function TimeInput(props: React.ComponentProps<typeof Input>) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let raw = e.target.value.replace(/\D/g, "");

    if (raw.length > 4) return;

    let formatted = raw;

    if (raw.length >= 3) {
      const hour = raw.slice(0, 2);
      const minute = raw.slice(2);

      if (Number(hour) > 23) return;

      if (minute.length === 2 && Number(minute) > 59) return;

      formatted = `${hour}:${minute}`;
    }

    props.onChange?.({
      ...e,
      target: {
        ...e.target,
        value: formatted,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  }

  return (
    <Input
      {...props}
      value={props.value ?? ""}
      onChange={handleChange}
      placeholder="HH:mm"
      maxLength={5}
      inputMode="numeric"
    />
  );
}
