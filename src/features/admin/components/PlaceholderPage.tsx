import React from "react";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description = "Màn hình này đang được phát triển.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-5">
        <Construction size={36} className="text-blue-400" />
      </div>
      <h2 className="text-xl font-bold text-slate-700">{title}</h2>
      <p className="text-sm text-slate-400 mt-2 max-w-xs">{description}</p>
      <div className="mt-5 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
        <p className="text-xs font-medium text-blue-600">🚀 Coming soon</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
