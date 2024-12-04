"use client";

import React, { Suspense } from "react";
import UpdateEventContent from "./updatelogic";

export default function UpdateEventPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateEventContent />
    </Suspense>
  );
}

