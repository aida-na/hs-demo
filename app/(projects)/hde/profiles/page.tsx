"use client";

import { MemberProfiles } from "@/components/hde/memberprofiles"

export default function ProfilesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <MemberProfiles />
      </div>
    </div>
  );
}
