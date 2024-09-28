"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [keyword, setKeyword] = useState(query);

  useEffect(() => {
    setKeyword(query ?? "");
  }, [query]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${keyword}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <input
        value={keyword}
        onChange={handleChangeKeyword}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
