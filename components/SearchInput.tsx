"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import Input from "./Input";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div>
      <Input
        placeholder="What do you want to listen?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};