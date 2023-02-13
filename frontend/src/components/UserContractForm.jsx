import API from "@services/api";
import React, { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import "../assets/common.css";
import "../assets/Usercontractform.css";

function UserContractForm() {
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const userId = sessionStorage.getItem("userId");
  const [name, setName] = useState("");
  const [initialCost, setInitialCost] = useState(0);
  const { setIsContractSent } = useContext(MainContext);
  const { setIsFileModal } = useContext(MainContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("initialCost", initialCost);
    API.post("/upload/contracts", formData)
      .then(() => {
        setIsContractSent(true);
        setIsFileModal(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="usercontractform">
      <h2>Envoyer un contrat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Nom du fichier"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <select required onChange={(e) => setCategory(e.target.value)}>
          <option value="" required="">
            Catégorie
          </option>
          <option value="Assurance Habitation">Assurance Habitation</option>
          <option value="Assurance Prêt">Assurance Prêt</option>
          <option value="Assurance Véhicule">Assurance Véhicule</option>
          <option value="Energie">Energie</option>
          <option value="Mutuelle">Mutuelle</option>
          <option value="Services Multimédia">Services Multimédia</option>
          <option value="Téléphonie &amp; Internet">
            Téléphonie &amp; Internet
          </option>
          <option value="Autres">Autres</option>
        </select>
        <input
          type="number"
          required
          placeholder="Montant du contrat par mois (Ex: 160)"
          onChange={(e) => setInitialCost(parseInt(e.target.value, 10))}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default UserContractForm;
