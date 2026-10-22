// دالة مشتركة بتتعمل لها import في Navigation.tsx وHero.tsx، بدل ما تتكرر في كل ملف.
export const downloadCV = () => {
  const link = document.createElement("a");
  link.href = "/cv/Ahmed Ezzat_cv.pdf";
  link.download = "Ahmed_Ezzat_Allam_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};