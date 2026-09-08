export default function nav() {
  const navButtons = document.querySelectorAll(".nav-item");
  const tabs = document.querySelectorAll(".content-section");
  const active = "active";

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");

      //Verifica se existe essa página
      if (document.getElementById(targetId)) {
        tabs.forEach((tab) => tab.classList.remove(active));

        document.getElementById(targetId).classList.add(active);
      } else window.alert("Essa página ainda não existe");
    });
  });
}
