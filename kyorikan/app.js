// ふわっと出る動きと、スマホで下に出る診断ボタン
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }
  // 最初の案内を過ぎたら出す。案内の枠が見えている間は隠す
  const float = document.querySelector(".float-button");
  const first = document.querySelector(".cta-box");
  const boxes = [...document.querySelectorAll(".cta-box")];
  const update = () => {
    const passed = first && first.getBoundingClientRect().bottom < 0;
    const boxVisible = boxes.some((b) => { const r = b.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; });
    float.classList.toggle("show", passed && !boxVisible);
  };
  addEventListener("scroll", update, { passive: true });
  update();
})();
