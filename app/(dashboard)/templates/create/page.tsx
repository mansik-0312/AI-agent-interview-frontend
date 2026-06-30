"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CreateTemplateHeader from "@/components/templates/create/create-template-header";
import BasicInformation from "@/components/templates/create/basic-information";
import CreateTemplateFooter from "@/components/templates/create/create-template-footer";

import { useCreateTemplate } from "@/hooks/useCreateTemplate";

export default function CreateTemplatePage() {
  const router = useRouter();

  const [name, setName] = useState("");2
  const [description, setDescription] = useState("");

  const {
    createTemplate,
    loading,
    error,
  } = useCreateTemplate();

  async function handleCreate() {
    const success = await createTemplate({
      name: name.trim(),
      description: description.trim(),
      totalQuestions: 0,
    });

    if (success) {
      router.push("/templates");
    }
  }

  return (
    <div className="space-y-8">
      <CreateTemplateHeader />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <BasicInformation
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
      />

      <CreateTemplateFooter
        loading={loading}
        disabled={!name.trim()}
        onSubmit={handleCreate}
      />
    </div>
  );
}