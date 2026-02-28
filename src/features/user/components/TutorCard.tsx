import React from "react";
import { Link } from "react-router-dom";
import { Tutor } from "../data/tutors";

interface TutorCardProps {
  tutor: Tutor;
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col hover:shadow-xl transition-shadow group">
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <img
            className="size-16 rounded-full object-cover"
            src={tutor.avatar}
            alt={tutor.name}
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full flex items-center justify-center p-0.5 border-2 border-white dark:border-background-dark">
            <span className="material-symbols-outlined text-[12px] font-bold">
              check
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-lg">
          <span className="material-symbols-outlined text-orange-400 text-sm">
            star
          </span>
          <span className="text-xs font-bold text-orange-600">
            {tutor.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            ({tutor.reviewsCount})
          </span>
        </div>
      </div>
      <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
        {tutor.name}
      </h3>
      <p className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">location_on</span>{" "}
        {tutor.location}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tutor.subjects.map((subject) => (
          <span
            key={subject}
            className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase flex items-center"
          >
            {subject}
          </span>
        ))}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 italic">
        {tutor.description}
      </p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
            Kinh nghiệm
          </p>
          <p className="text-sm font-bold">{tutor.experienceYears} Năm</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center flex flex-col items-center justify-center">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
            Học phí
          </p>
          <p className="text-sm font-bold text-primary">
            {tutor.pricePerSession}k/buổi
          </p>
        </div>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-3">
        <Link
          to={`/tutor/${tutor.id}`}
          className="w-full flex items-center justify-center py-2.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Hồ sơ
        </Link>
        <button className="w-full flex items-center justify-center py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
          Học thử
        </button>
      </div>
    </div>
  );
}
