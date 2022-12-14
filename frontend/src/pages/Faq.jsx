import React from "react";
import "../assets/common.css";
import "../assets/Faq.css";

export default function Faq() {
  return (
    <div className="faq-div" id="faq">
      <h1>FOIRE AUX QUESTIONS</h1>
      <details>
        <summary>Pourquoi devenir SELLECT ?</summary>
        <p>
          <ul>
            <li>
              En rejoignant la communauté SELLECT, nous vous garantissons une
              refonte globale de vos dépenses. Chaque année vous aurez la
              garantie de payer le prix le plus juste et ainsi faire des
              économies.
            </li>
            <li>
              Nous gardons une veille sur TOUS vos contrats. Nous vous
              garantissons qu’une offre plus intéressante ne vous échappera pas.
            </li>
            <li>
              Les analyses se font via nos outils. Plus de démarchage
              téléphonique vos coordonnées restent privées.
            </li>
            <li>
              Astuces bons et plans, Nous vous faisons partager via notre
              sélection le meilleur du web.
            </li>
            <li>Un interlocuteur unique, de proximité.</li>
          </ul>
        </p>
      </details>

      <details>
        <summary> Que contient l’Audit ?</summary>
        <p>
          {" "}
          L’audit est composé de trois phases:
          <ul>
            <li>
              Premier rendez-vous: nous collectons les informations sur les
              différents contrats que vous souhaitez améliorer. Nous établissons
              ensemble un cahier des charges dans lequel vous définissez les
              limites de chaque futur contrat. Ce rendez-vous peut être en
              physique ou à distance par visioconférence.
            </li>
            <li>
              Deuxième phase: création d’un compte utilisateur. Création d'un
              tableau de bord pour la gestion et le lancement de l’analyse.
              Analyse comparative des résultats obtenus et du cahier des
              charges.
            </li>
            <li>
              Troisième phase: présentation au client du gain potentiel
              d'économie.
            </li>
          </ul>
        </p>
      </details>

      <details>
        <summary>Que se passe y-il après l’audit ?</summary>
        <p>
          {" "}
          Vous restez maître de vos contrats. Si vous souhaitez mettre en œuvre
          tout ou une partie des changements nous nous chargeons via notre
          partenaire de lancer les démarches et ce sans frais supplémentaires.
        </p>
        <p>
          Que se passe-t-il en cas de changement de situation ? Reprenez contact
          avec votre référent de proximité afin d’actualiser votre situation.
        </p>
      </details>

      <details>
        <summary>Quel est le montant d'un audit ?</summary>
        <p>
          Le montant de l’audit est de 65 euros TTC à régler dès la prise de
          rendez-vous. Celui-ci pourra être remboursé sans condition en cas
          d’annulation.{" "}
        </p>
      </details>
      <div className="contact">
        <h1>Une autre question ?</h1>
        <h2>► Contactez: </h2>
        <a href="mailto:Sellect33@gmail.com">Sellect33@gmail.com </a>
        <h3>Nous y réponderons dans les plus brefs délais.</h3>
      </div>
    </div>
  );
}
