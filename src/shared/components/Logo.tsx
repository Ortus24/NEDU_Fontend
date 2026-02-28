import { GraduationCap } from "lucide-react";

// Sử dụng trong Component của bạn
export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* Thay cho <span className="material-symbols-outlined">school</span> */}
      <GraduationCap
        size={32}
        strokeWidth={2}
        className="text-blue-600 transition-all hover:scale-110"
      />
    </div>
  );
}
