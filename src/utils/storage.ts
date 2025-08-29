// utils/storage.ts

export const saveResumeTime = (movieId: string, time: number) => {
  const data = JSON.parse(localStorage.getItem("resumeData") || "{}");
  data[movieId] = time;
  localStorage.setItem("resumeData", JSON.stringify(data));
};

export const getResumeTime = (movieId: string): number | null => {
  const data = JSON.parse(localStorage.getItem("resumeData") || "{}");
  return data[movieId] ?? null;
};
