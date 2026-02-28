export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  location: string;
  subjects: string[];
  description: string;
  experienceYears: number;
  pricePerSession: number;
  availableDays: string[];
}

export const mockTutors: Tutor[] = [
  {
    id: "1",
    name: "Nguyễn Thu Hà",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCe6cd7ZzasOV2ydUQJUimMrpCa-u1_O6hlPf23qMcffV1EFGWa8OO4E3vTnrjRKGhxIdle4YBkeUnp7sxkUKS4u27t92Au9x6ipnL6L3N3mfuuBVxHWwDq6bQvKF4LzZxX6s2bAmUJJOh1Rua5AivRX4aWuS4KoXQjtBmqdo-iv59sh8SECTe-dgWrJvrzNkRKVgMhnGzV9cXFyZ3PkufIeSFi_dMl5LVvI6PWHURTxxYj2JXPcZX3W6lsilMc3jQx3g_9lw8gPqA",
    rating: 4.9,
    reviewsCount: 120,
    location: "Cầu Giấy, Hà Nội",
    subjects: ["Toán học", "Luyện thi ĐH"],
    description:
      '"5 năm kinh nghiệm luyện thi khối A. Giúp học sinh nắm vững bản thân thông qua phương pháp sơ đồ tư duy."',
    experienceYears: 5,
    pricePerSession: 250,
    availableDays: ["T2", "T4", "T6"],
  },
  {
    id: "2",
    name: "Trần Văn Tú",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVIqQ0Do1hnJCu-cz-GX9QOb6nmBUN6UVs6NO_-sG-MBklR6dbvgaIuxYZ7tMTybPd_IcOAweLm_hyJ05inQ5mswqyq_8hZwXZP8CZDvjXEQmR2C5qflBXyDwNFRw_Pj_hfE8MnJQojmnQ0luPlW6PJxSRXONb4Z_0h2O986ZY58kD8_TuOF7AY1kF_oPlUdHvXpoo7xQHcaxW9eLFgVaONoHvRW5niOG__UHETz668NjxpdaFhPHbKsncMa3xtLbUYAK_KuOPhhE",
    rating: 5.0,
    reviewsCount: 84,
    location: "Quận 1, TP. HCM",
    subjects: ["Tiếng Anh", "IELTS"],
    description:
      '"Chuyên luyện Speaking & Writing với giáo trình cá nhân hóa. Đã giúp >50 học viên đạt target."',
    experienceYears: 3,
    pricePerSession: 400,
    availableDays: ["T3", "T5", "T7", "CN"],
  },
  {
    id: "3",
    name: "Lê Minh Trang",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDj-FJdT2NQqmO5mHVvh3ct0Zb-BYjWAuyfA0wU0oyw7Fm1SxvuYojAWsxIEwSr86x65HwYnfmWVAWkB_HlqqMCIL25zjOT_fFbsWMDQJXqHuUJaXLHzHFXmdEn4tC6dfK3ABEnzdK9ZS8ubn_jBdmRSHCOuN8IJeoyxlrUlyD78aHd7WxEPQq7UgzDkJAmH4V8tQdjrXZ0wJUzjeWmJFS-oi0fTxEar60xJN1wF0U9xdCKzhMzVa_OXi7IuUMHpyAhnvhF6SjBuzo",
    rating: 4.8,
    reviewsCount: 215,
    location: "Hải Châu, Đà Nẵng",
    subjects: ["Vật lý", "Hóa học"],
    description:
      '"Giảng viên trường chuyên với đam mê truyền cảm hứng khoa học cho học sinh phổ thông."',
    experienceYears: 10,
    pricePerSession: 300,
    availableDays: ["T7", "CN"],
  },
  {
    id: "4",
    name: "Hoàng Anh Đức",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1yVnUMPDU-e9IzmxbDPB2rrPxw5MGbKWlwQHwUF0pwUXtVlmmo6w8dqHeyx0rFFKbGwI6bJ0iISGrrgI1xcDVV1THXGfdvfGJW9fTcZShjZyhq4TSdA8AOG21LKeiiOoKT4PxB51VmkSMZeo0HN9w2HfOAqrU01QCd0gtsj_7B2dWbyqwA3PeYBg9EK4pUFrPkRbKFwlJRufmbQbCU5wy_EyQk5SpNm9-FwwD8sZVQERFk6oaSS0_-JL-Z4HVj0_kzfi8qfCj6EM",
    rating: 4.7,
    reviewsCount: 42,
    location: "Đống Đa, Hà Nội",
    subjects: ["Tin học", "Toán học"],
    description:
      '"Hỗ trợ lập trình Python, C++ cơ bản và nâng cao cho mọi lứa tuổi."',
    experienceYears: 2,
    pricePerSession: 200,
    availableDays: ["T2", "T3", "T4"],
  },
  {
    id: "5",
    name: "Phạm Hải Yến",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCe6cd7ZzasOV2ydUQJUimMrpCa-u1_O6hlPf23qMcffV1EFGWa8OO4E3vTnrjRKGhxIdle4YBkeUnp7sxkUKS4u27t92Au9x6ipnL6L3N3mfuuBVxHWwDq6bQvKF4LzZxX6s2bAmUJJOh1Rua5AivRX4aWuS4KoXQjtBmqdo-iv59sh8SECTe-dgWrJvrzNkRKVgMhnGzV9cXFyZ3PkufIeSFi_dMl5LVvI6PWHURTxxYj2JXPcZX3W6lsilMc3jQx3g_9lw8gPqA",
    rating: 4.6,
    reviewsCount: 65,
    location: "Bình Thạnh, TP. HCM",
    subjects: ["Ngữ văn"],
    description:
      '"Hướng dẫn kỹ năng viết văn sáng tạo, phân tích tác phẩm hiệu quả. Phù hợp cho HS cấp 2, 3."',
    experienceYears: 4,
    pricePerSession: 180,
    availableDays: ["T4", "T6", "CN"],
  },
  {
    id: "6",
    name: "Đặng Quang Duy",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVIqQ0Do1hnJCu-cz-GX9QOb6nmBUN6UVs6NO_-sG-MBklR6dbvgaIuxYZ7tMTybPd_IcOAweLm_hyJ05inQ5mswqyq_8hZwXZP8CZDvjXEQmR2C5qflBXyDwNFRw_Pj_hfE8MnJQojmnQ0luPlW6PJxSRXONb4Z_0h2O986ZY58kD8_TuOF7AY1kF_oPlUdHvXpoo7xQHcaxW9eLFgVaONoHvRW5niOG__UHETz668NjxpdaFhPHbKsncMa3xtLbUYAK_KuOPhhE",
    rating: 4.8,
    reviewsCount: 110,
    location: "Thanh Xuân, Hà Nội",
    subjects: ["Tin học", "Tiếng Anh"],
    description:
      '"Chuyên dạy lập trình web cho người mới bắt đầu. Tiếng Anh chuyên ngành IT."',
    experienceYears: 6,
    pricePerSession: 350,
    availableDays: ["T7", "CN"],
  },
  {
    id: "7",
    name: "Vũ Thanh Mai",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDj-FJdT2NQqmO5mHVvh3ct0Zb-BYjWAuyfA0wU0oyw7Fm1SxvuYojAWsxIEwSr86x65HwYnfmWVAWkB_HlqqMCIL25zjOT_fFbsWMDQJXqHuUJaXLHzHFXmdEn4tC6dfK3ABEnzdK9ZS8ubn_jBdmRSHCOuN8IJeoyxlrUlyD78aHd7WxEPQq7UgzDkJAmH4V8tQdjrXZ0wJUzjeWmJFS-oi0fTxEar60xJN1wF0U9xdCKzhMzVa_OXi7IuUMHpyAhnvhF6SjBuzo",
    rating: 4.5,
    reviewsCount: 30,
    location: "Gò Vấp, TP. HCM",
    subjects: ["Sinh học", "Hóa học"],
    description:
      '"Sinh viên năm cuối Y Dược, nhiệt tình, có trách nhiệm. Củng cố kiến thức nền tảng trong 1 tháng."',
    experienceYears: 2,
    pricePerSession: 150,
    availableDays: ["T2", "T3", "T4", "T5", "T6"],
  },
  {
    id: "8",
    name: "Bùi Quốc Tuấn",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1yVnUMPDU-e9IzmxbDPB2rrPxw5MGbKWlwQHwUF0pwUXtVlmmo6w8dqHeyx0rFFKbGwI6bJ0iISGrrgI1xcDVV1THXGfdvfGJW9fTcZShjZyhq4TSdA8AOG21LKeiiOoKT4PxB51VmkSMZeo0HN9w2HfOAqrU01QCd0gtsj_7B2dWbyqwA3PeYBg9EK4pUFrPkRbKFwlJRufmbQbCU5wy_EyQk5SpNm9-FwwD8sZVQERFk6oaSS0_-JL-Z4HVj0_kzfi8qfCj6EM",
    rating: 4.9,
    reviewsCount: 200,
    location: "Hai Bà Trưng, Hà Nội",
    subjects: ["Toán học", "Vật lý"],
    description:
      '"Ôn thi vào 10 và thi THPT Quốc Gia môn Toán Lý. Tỉ lệ đỗ cao."',
    experienceYears: 8,
    pricePerSession: 280,
    availableDays: ["T2", "T4", "T6", "T7"],
  },
  {
    id: "9",
    name: "Lý Kiều Trang",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCe6cd7ZzasOV2ydUQJUimMrpCa-u1_O6hlPf23qMcffV1EFGWa8OO4E3vTnrjRKGhxIdle4YBkeUnp7sxkUKS4u27t92Au9x6ipnL6L3N3mfuuBVxHWwDq6bQvKF4LzZxX6s2bAmUJJOh1Rua5AivRX4aWuS4KoXQjtBmqdo-iv59sh8SECTe-dgWrJvrzNkRKVgMhnGzV9cXFyZ3PkufIeSFi_dMl5LVvI6PWHURTxxYj2JXPcZX3W6lsilMc3jQx3g_9lw8gPqA",
    rating: 5.0,
    reviewsCount: 15,
    location: "Quy Nhơn, Bình Định",
    subjects: ["Tiếng Anh"],
    description:
      '"Phát âm chuẩn giọng Mỹ, tạo môi trường luyện nói thường xuyên cho học viên."',
    experienceYears: 1,
    pricePerSession: 120,
    availableDays: ["CN"],
  },
  {
    id: "10",
    name: "Đỗ Thành Đạt",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVIqQ0Do1hnJCu-cz-GX9QOb6nmBUN6UVs6NO_-sG-MBklR6dbvgaIuxYZ7tMTybPd_IcOAweLm_hyJ05inQ5mswqyq_8hZwXZP8CZDvjXEQmR2C5qflBXyDwNFRw_Pj_hfE8MnJQojmnQ0luPlW6PJxSRXONb4Z_0h2O986ZY58kD8_TuOF7AY1kF_oPlUdHvXpoo7xQHcaxW9eLFgVaONoHvRW5niOG__UHETz668NjxpdaFhPHbKsncMa3xtLbUYAK_KuOPhhE",
    rating: 4.4,
    reviewsCount: 50,
    location: "Nam Từ Liêm, Hà Nội",
    subjects: ["Vật lý", "Tin học"],
    description:
      '"Bồi dưỡng HSG cấp tỉnh/thành phố môn Vật Lý. Giáo trình nâng cao."',
    experienceYears: 5,
    pricePerSession: 250,
    availableDays: ["T5", "T6", "T7"],
  },
  {
    id: "11",
    name: "Ngô Lan Anh",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDj-FJdT2NQqmO5mHVvh3ct0Zb-BYjWAuyfA0wU0oyw7Fm1SxvuYojAWsxIEwSr86x65HwYnfmWVAWkB_HlqqMCIL25zjOT_fFbsWMDQJXqHuUJaXLHzHFXmdEn4tC6dfK3ABEnzdK9ZS8ubn_jBdmRSHCOuN8IJeoyxlrUlyD78aHd7WxEPQq7UgzDkJAmH4V8tQdjrXZ0wJUzjeWmJFS-oi0fTxEar60xJN1wF0U9xdCKzhMzVa_OXi7IuUMHpyAhnvhF6SjBuzo",
    rating: 4.7,
    reviewsCount: 88,
    location: "Sơn Trà, Đà Nẵng",
    subjects: ["Ngữ văn", "Tiếng Anh"],
    description:
      '"Phương pháp giảng dạy lôi cuốn, truyền lửa đam mê đối với môn văn học."',
    experienceYears: 7,
    pricePerSession: 220,
    availableDays: ["T2", "T3", "T4"],
  },
  {
    id: "12",
    name: "Hoàng Phú",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1yVnUMPDU-e9IzmxbDPB2rrPxw5MGbKWlwQHwUF0pwUXtVlmmo6w8dqHeyx0rFFKbGwI6bJ0iISGrrgI1xcDVV1THXGfdvfGJW9fTcZShjZyhq4TSdA8AOG21LKeiiOoKT4PxB51VmkSMZeo0HN9w2HfOAqrU01QCd0gtsj_7B2dWbyqwA3PeYBg9EK4pUFrPkRbKFwlJRufmbQbCU5wy_EyQk5SpNm9-FwwD8sZVQERFk6oaSS0_-JL-Z4HVj0_kzfi8qfCj6EM",
    rating: 4.6,
    reviewsCount: 112,
    location: "Quận 3, TP. HCM",
    subjects: ["Sinh học"],
    description:
      '"Truyền đạt bằng hình ảnh trực quan, dễ nhớ, làm thí nghiệm ảo sinh động."',
    experienceYears: 4,
    pricePerSession: 190,
    availableDays: ["T2", "T5", "CN"],
  },
];
