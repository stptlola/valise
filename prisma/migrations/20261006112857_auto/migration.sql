-- CreateEnum
CREATE TYPE "TypeDestination" AS ENUM ('COMPLETE', 'FICHE', 'VOISINE');

-- CreateEnum
CREATE TYPE "Statut" AS ENUM ('BROUILLON', 'PUBLIE');

-- CreateEnum
CREATE TYPE "Acces" AS ENUM ('GRATUIT', 'APERCU', 'PAYANT');

-- CreateEnum
CREATE TYPE "Profil" AS ENUM ('SOLO', 'COUPLE', 'FAMILLE', 'AMIS', 'MOBILITE_REDUITE');

-- CreateEnum
CREATE TYPE "Categorie" AS ENUM ('VOIR', 'MANGER', 'BOIRE', 'SORTIR', 'DORMIR', 'ACHETER');

-- CreateEnum
CREATE TYPE "Moment" AS ENUM ('MATIN', 'MIDI', 'APRES_MIDI', 'SOIR');

-- CreateEnum
CREATE TYPE "Variante" AS ENUM ('NORMALE', 'PLUIE');

-- CreateEnum
CREATE TYPE "Niveau" AS ENUM ('FAIBLE', 'MOYEN', 'FORT');

-- CreateEnum
CREATE TYPE "StyleVoyage" AS ENUM ('ECONOMIQUE', 'CONFORT', 'PREMIUM');

-- CreateEnum
CREATE TYPE "Poste" AS ENUM ('HEBERGEMENT', 'REPAS', 'VISITES', 'TRANSPORTS');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('UTILISATEUR', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatutAchat" AS ENUM ('EN_ATTENTE', 'PAYE', 'REMBOURSE', 'ANNULE');

-- CreateEnum
CREATE TYPE "OrigineDroit" AS ENUM ('ACHAT', 'LOT', 'OFFRE_LANCEMENT', 'CARTE_CADEAU', 'RECOMPENSE');

-- CreateEnum
CREATE TYPE "StatutDemande" AS ENUM ('NOUVELLE', 'EN_COURS', 'TRAITEE', 'REFUSEE');

-- CreateEnum
CREATE TYPE "StatutModeration" AS ENUM ('EN_ATTENTE', 'A_VERIFIER', 'VALIDEE', 'REFUSEE');

-- CreateEnum
CREATE TYPE "TypeSignalement" AS ENUM ('ADRESSE_FERMEE', 'PEPITE', 'AUTRE');

-- CreateEnum
CREATE TYPE "TypeAutocollant" AS ENUM ('ESCALE', 'CONTRIBUTEUR', 'SIGNALEMENT');

-- CreateEnum
CREATE TYPE "TypeRecompense" AS ENUM ('REDUCTION', 'ESCALE_OFFERTE', 'AUTOCOLLANT');

-- CreateEnum
CREATE TYPE "TypeCollection" AS ENUM ('PAYS', 'THEME');

-- CreateEnum
CREATE TYPE "TypePass" AS ENUM ('TOUTES_ESCALES', 'COLLECTION');

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "pays" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "couleur" TEXT NOT NULL,
    "type" "TypeDestination" NOT NULL,
    "autocollant" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "devise" TEXT,
    "pourboires" TEXT,
    "conseilsOfficiels" TEXT,
    "budgetJourMin" INTEGER,
    "budgetJourMax" INTEGER,
    "dureeIdeale" TEXT,
    "profilsConseilles" "Profil"[],
    "statut" "Statut" NOT NULL DEFAULT 'BROUILLON',
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifieLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClimatMensuel" (
    "destinationId" TEXT NOT NULL,
    "mois" INTEGER NOT NULL,
    "tempMin" DOUBLE PRECISION NOT NULL,
    "tempMax" DOUBLE PRECISION NOT NULL,
    "joursPluie" INTEGER,
    "affluence" "Niveau",
    "prix" "Niveau",
    "evenements" TEXT,
    "source" TEXT,

    CONSTRAINT "ClimatMensuel_pkey" PRIMARY KEY ("destinationId","mois")
);

-- CreateTable
CREATE TABLE "Escale" (
    "id" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "principaleId" TEXT,
    "prixCentimes" INTEGER NOT NULL,
    "statut" "Statut" NOT NULL DEFAULT 'BROUILLON',
    "misAJourLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listeGoogleMaps" TEXT,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifieLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartieEscale" (
    "id" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" JSONB NOT NULL,
    "acces" "Acces" NOT NULL,

    CONSTRAINT "PartieEscale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nouveaute" (
    "id" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "texte" TEXT NOT NULL,
    "source" TEXT,
    "dateLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nouveaute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quartier" (
    "id" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "ambiance" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Quartier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adresse" (
    "id" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "quartierId" TEXT,
    "nom" TEXT NOT NULL,
    "categorie" "Categorie" NOT NULL,
    "prix" INTEGER NOT NULL,
    "prixRepere" TEXT,
    "profils" "Profil"[],
    "pourquoi" TEXT NOT NULL,
    "bonASavoir" TEXT,
    "siteOfficiel" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "testeeLe" TIMESTAMP(3),
    "testeePar" TEXT,
    "lienPartenaire" TEXT,
    "statut" "Statut" NOT NULL DEFAULT 'BROUILLON',
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifieLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adresse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itineraire" (
    "id" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "duree" INTEGER NOT NULL,

    CONSTRAINT "Itineraire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourItineraire" (
    "id" TEXT NOT NULL,
    "itineraireId" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "titre" TEXT NOT NULL,

    CONSTRAINT "JourItineraire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtapeItineraire" (
    "id" TEXT NOT NULL,
    "jourId" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL,
    "moment" "Moment" NOT NULL,
    "variante" "Variante" NOT NULL DEFAULT 'NORMALE',
    "titre" TEXT NOT NULL,
    "raison" TEXT NOT NULL,
    "dureeMinutes" INTEGER,
    "conseil" TEXT,
    "adresseId" TEXT,

    CONSTRAINT "EtapeItineraire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraireAeroport" (
    "id" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "aeroport" TEXT NOT NULL,
    "dureeHeures" INTEGER NOT NULL,
    "etapes" JSONB NOT NULL,

    CONSTRAINT "ItineraireAeroport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TacheCompteARebours" (
    "id" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "joursAvantDepart" INTEGER NOT NULL,
    "texte" TEXT NOT NULL,
    "lien" TEXT,
    "source" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TacheCompteARebours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrixRepere" (
    "id" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "poste" "Poste" NOT NULL,
    "style" "StyleVoyage" NOT NULL,
    "libelle" TEXT NOT NULL,
    "montantCentimes" INTEGER NOT NULL,
    "source" TEXT,
    "verifieLe" TIMESTAMP(3),

    CONSTRAINT "PrixRepere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementValise" (
    "id" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "mois" INTEGER,
    "profil" "Profil",
    "categorie" TEXT NOT NULL,
    "texte" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ElementValise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhraseLexique" (
    "id" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "francais" TEXT NOT NULL,
    "traduction" TEXT NOT NULL,
    "prononciation" TEXT,
    "audio" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PhraseLexique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "type" "TypeCollection" NOT NULL,
    "statut" "Statut" NOT NULL DEFAULT 'BROUILLON',

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionDestination" (
    "collectionId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,

    CONSTRAINT "CollectionDestination_pkey" PRIMARY KEY ("collectionId","destinationId")
);

-- CreateTable
CREATE TABLE "QuestionFrequente" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "reponse" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QuestionFrequente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "chemin" TEXT NOT NULL,
    "largeur" INTEGER NOT NULL,
    "hauteur" INTEGER NOT NULL,
    "texteAlternatif" TEXT NOT NULL,
    "credit" TEXT NOT NULL,
    "licence" TEXT NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeteoJour" (
    "destinationId" TEXT NOT NULL,
    "jour" DATE NOT NULL,
    "tempMin" DOUBLE PRECISION NOT NULL,
    "tempMax" DOUBLE PRECISION NOT NULL,
    "pluieMm" DOUBLE PRECISION NOT NULL,
    "symbole" TEXT,
    "recupereLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeteoJour_pkey" PRIMARY KEY ("destinationId","jour")
);

-- CreateTable
CREATE TABLE "TauxChange" (
    "devise" TEXT NOT NULL,
    "pourUnEuro" DOUBLE PRECISION NOT NULL,
    "recupereLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TauxChange_pkey" PRIMARY KEY ("devise")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'UTILISATEUR',
    "profilVoyage" "Profil",
    "codeParrainage" TEXT NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Favori" (
    "userId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favori_pkey" PRIMARY KEY ("userId","destinationId")
);

-- CreateTable
CREATE TABLE "DepartPrevu" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "dateDepart" DATE NOT NULL,
    "dateRetour" DATE,

    CONSTRAINT "DepartPrevu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TacheCochee" (
    "departId" TEXT NOT NULL,
    "tacheId" TEXT NOT NULL,
    "cocheeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TacheCochee_pkey" PRIMARY KEY ("departId","tacheId")
);

-- CreateTable
CREATE TABLE "ValisePersonnelle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "elementsCoches" TEXT[],
    "elementsAjoutes" JSONB NOT NULL DEFAULT '[]',
    "modifieLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValisePersonnelle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaLigne" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "jour" DATE,
    "modifieLe" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaLigne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaLigneAdresse" (
    "ligneId" TEXT NOT NULL,
    "adresseId" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL,

    CONSTRAINT "MaLigneAdresse_pkey" PRIMARY KEY ("ligneId","adresseId")
);

-- CreateTable
CREATE TABLE "VoyageMarque" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pays" TEXT NOT NULL,
    "ville" TEXT,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoyageMarque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutocollantObtenu" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TypeAutocollant" NOT NULL,
    "reference" TEXT NOT NULL,
    "positionX" DOUBLE PRECISION,
    "positionY" DOUBLE PRECISION,
    "rotation" DOUBLE PRECISION,
    "obtenuLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AutocollantObtenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "escaleId" TEXT,
    "lotId" TEXT,
    "montantCentimes" INTEGER NOT NULL,
    "devise" TEXT NOT NULL DEFAULT 'EUR',
    "statut" "StatutAchat" NOT NULL DEFAULT 'EN_ATTENTE',
    "codePromoId" TEXT,
    "carteCadeauId" TEXT,
    "montantCarteCentimes" INTEGER NOT NULL DEFAULT 0,
    "parrainageId" TEXT,
    "stripeSessionId" TEXT NOT NULL,
    "stripePaiementId" TEXT,
    "renonciationAccepteeLe" TIMESTAMP(3) NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payeLe" TIMESTAMP(3),

    CONSTRAINT "Achat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facture" (
    "id" TEXT NOT NULL,
    "numero" SERIAL NOT NULL,
    "achatId" TEXT NOT NULL,
    "montantCentimes" INTEGER NOT NULL,
    "emiseLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fichier" TEXT,

    CONSTRAINT "Facture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DroitEscale" (
    "userId" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,
    "origine" "OrigineDroit" NOT NULL,
    "achatId" TEXT,
    "accordeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DroitEscale_pkey" PRIMARY KEY ("userId","escaleId")
);

-- CreateTable
CREATE TABLE "Lot" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prixCentimes" INTEGER NOT NULL,
    "statut" "Statut" NOT NULL DEFAULT 'BROUILLON',

    CONSTRAINT "Lot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LotEscale" (
    "lotId" TEXT NOT NULL,
    "escaleId" TEXT NOT NULL,

    CONSTRAINT "LotEscale_pkey" PRIMARY KEY ("lotId","escaleId")
);

-- CreateTable
CREATE TABLE "Retractation" (
    "id" TEXT NOT NULL,
    "achatId" TEXT NOT NULL,
    "demandeeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" "StatutDemande" NOT NULL DEFAULT 'NOUVELLE',
    "traiteeLe" TIMESTAMP(3),

    CONSTRAINT "Retractation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodePromo" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "pourcentage" INTEGER,
    "montantCentimes" INTEGER,
    "debut" TIMESTAMP(3),
    "fin" TIMESTAMP(3),
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "utilisationsMax" INTEGER,
    "utilisations" INTEGER NOT NULL DEFAULT 0,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodePromo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarteCadeau" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "montantCentimes" INTEGER NOT NULL,
    "soldeCentimes" INTEGER NOT NULL,
    "acheteurId" TEXT,
    "acheteurEmail" TEXT NOT NULL,
    "beneficiaireEmail" TEXT,
    "message" TEXT,
    "expireLe" TIMESTAMP(3) NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarteCadeau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parrainage" (
    "id" TEXT NOT NULL,
    "parrainId" TEXT NOT NULL,
    "filleulId" TEXT NOT NULL,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creditePar" TEXT,

    CONSTRAINT "Parrainage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pass" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TypePass" NOT NULL,
    "collectionId" TEXT,
    "debut" TIMESTAMP(3) NOT NULL,
    "fin" TIMESTAMP(3),
    "stripeAbonnementId" TEXT,

    CONSTRAINT "Pass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InscriptionPrevenir" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "consentementLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "desinscritLe" TIMESTAMP(3),

    CONSTRAINT "InscriptionPrevenir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL,
    "auteurId" TEXT,
    "auteurPrenom" TEXT NOT NULL,
    "auteurEmail" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "nomLieu" TEXT NOT NULL,
    "quartier" TEXT NOT NULL,
    "categorie" "Categorie" NOT NULL,
    "prix" INTEGER NOT NULL,
    "profils" "Profil"[],
    "pourquoi" TEXT NOT NULL,
    "estHabitant" BOOLEAN NOT NULL,
    "derniereVisite" DATE NOT NULL,
    "travailleIci" BOOLEAN NOT NULL DEFAULT false,
    "statut" "StatutModeration" NOT NULL DEFAULT 'EN_ATTENTE',
    "adresseId" TEXT,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modereeLe" TIMESTAMP(3),

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signalement" (
    "id" TEXT NOT NULL,
    "auteurId" TEXT,
    "escaleId" TEXT NOT NULL,
    "adresseId" TEXT,
    "type" "TypeSignalement" NOT NULL,
    "message" TEXT NOT NULL,
    "statut" "StatutModeration" NOT NULL DEFAULT 'EN_ATTENTE',
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "traiteLe" TIMESTAMP(3),

    CONSTRAINT "Signalement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recompense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TypeRecompense" NOT NULL,
    "niveau" INTEGER,
    "codePromoId" TEXT,
    "escaleId" TEXT,
    "accordeeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recompense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalAdmin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "cible" TEXT NOT NULL,
    "details" JSONB,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JournalAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Destination_code_key" ON "Destination"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Escale_destinationId_key" ON "Escale"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "PartieEscale_escaleId_numero_key" ON "PartieEscale"("escaleId", "numero");

-- CreateIndex
CREATE UNIQUE INDEX "Quartier_escaleId_nom_key" ON "Quartier"("escaleId", "nom");

-- CreateIndex
CREATE INDEX "Adresse_escaleId_categorie_idx" ON "Adresse"("escaleId", "categorie");

-- CreateIndex
CREATE UNIQUE INDEX "Itineraire_escaleId_duree_key" ON "Itineraire"("escaleId", "duree");

-- CreateIndex
CREATE UNIQUE INDEX "JourItineraire_itineraireId_numero_key" ON "JourItineraire"("itineraireId", "numero");

-- CreateIndex
CREATE INDEX "EtapeItineraire_jourId_variante_ordre_idx" ON "EtapeItineraire"("jourId", "variante", "ordre");

-- CreateIndex
CREATE UNIQUE INDEX "PrixRepere_escaleId_poste_style_key" ON "PrixRepere"("escaleId", "poste", "style");

-- CreateIndex
CREATE UNIQUE INDEX "Media_chemin_key" ON "Media"("chemin");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_codeParrainage_key" ON "User"("codeParrainage");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "DepartPrevu_userId_escaleId_key" ON "DepartPrevu"("userId", "escaleId");

-- CreateIndex
CREATE UNIQUE INDEX "ValisePersonnelle_userId_escaleId_key" ON "ValisePersonnelle"("userId", "escaleId");

-- CreateIndex
CREATE UNIQUE INDEX "VoyageMarque_userId_pays_ville_key" ON "VoyageMarque"("userId", "pays", "ville");

-- CreateIndex
CREATE UNIQUE INDEX "AutocollantObtenu_userId_type_reference_key" ON "AutocollantObtenu"("userId", "type", "reference");

-- CreateIndex
CREATE UNIQUE INDEX "Achat_stripeSessionId_key" ON "Achat"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Facture_numero_key" ON "Facture"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Facture_achatId_key" ON "Facture"("achatId");

-- CreateIndex
CREATE UNIQUE INDEX "Retractation_achatId_key" ON "Retractation"("achatId");

-- CreateIndex
CREATE UNIQUE INDEX "CodePromo_code_key" ON "CodePromo"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CarteCadeau_code_key" ON "CarteCadeau"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Parrainage_filleulId_key" ON "Parrainage"("filleulId");

-- CreateIndex
CREATE UNIQUE INDEX "Pass_stripeAbonnementId_key" ON "Pass"("stripeAbonnementId");

-- CreateIndex
CREATE UNIQUE INDEX "InscriptionPrevenir_email_destinationId_key" ON "InscriptionPrevenir"("email", "destinationId");

-- CreateIndex
CREATE INDEX "Contribution_statut_idx" ON "Contribution"("statut");

-- CreateIndex
CREATE INDEX "Signalement_statut_idx" ON "Signalement"("statut");

-- CreateIndex
CREATE UNIQUE INDEX "Recompense_codePromoId_key" ON "Recompense"("codePromoId");

-- CreateIndex
CREATE UNIQUE INDEX "Recompense_userId_type_niveau_key" ON "Recompense"("userId", "type", "niveau");

-- CreateIndex
CREATE INDEX "JournalAdmin_creeLe_idx" ON "JournalAdmin"("creeLe");

-- AddForeignKey
ALTER TABLE "ClimatMensuel" ADD CONSTRAINT "ClimatMensuel_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escale" ADD CONSTRAINT "Escale_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escale" ADD CONSTRAINT "Escale_principaleId_fkey" FOREIGN KEY ("principaleId") REFERENCES "Escale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartieEscale" ADD CONSTRAINT "PartieEscale_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nouveaute" ADD CONSTRAINT "Nouveaute_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quartier" ADD CONSTRAINT "Quartier_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_quartierId_fkey" FOREIGN KEY ("quartierId") REFERENCES "Quartier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itineraire" ADD CONSTRAINT "Itineraire_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourItineraire" ADD CONSTRAINT "JourItineraire_itineraireId_fkey" FOREIGN KEY ("itineraireId") REFERENCES "Itineraire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapeItineraire" ADD CONSTRAINT "EtapeItineraire_jourId_fkey" FOREIGN KEY ("jourId") REFERENCES "JourItineraire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapeItineraire" ADD CONSTRAINT "EtapeItineraire_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "Adresse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraireAeroport" ADD CONSTRAINT "ItineraireAeroport_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TacheCompteARebours" ADD CONSTRAINT "TacheCompteARebours_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrixRepere" ADD CONSTRAINT "PrixRepere_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementValise" ADD CONSTRAINT "ElementValise_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhraseLexique" ADD CONSTRAINT "PhraseLexique_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionDestination" ADD CONSTRAINT "CollectionDestination_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionDestination" ADD CONSTRAINT "CollectionDestination_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeteoJour" ADD CONSTRAINT "MeteoJour_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartPrevu" ADD CONSTRAINT "DepartPrevu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartPrevu" ADD CONSTRAINT "DepartPrevu_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TacheCochee" ADD CONSTRAINT "TacheCochee_departId_fkey" FOREIGN KEY ("departId") REFERENCES "DepartPrevu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TacheCochee" ADD CONSTRAINT "TacheCochee_tacheId_fkey" FOREIGN KEY ("tacheId") REFERENCES "TacheCompteARebours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValisePersonnelle" ADD CONSTRAINT "ValisePersonnelle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValisePersonnelle" ADD CONSTRAINT "ValisePersonnelle_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaLigne" ADD CONSTRAINT "MaLigne_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaLigne" ADD CONSTRAINT "MaLigne_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaLigneAdresse" ADD CONSTRAINT "MaLigneAdresse_ligneId_fkey" FOREIGN KEY ("ligneId") REFERENCES "MaLigne"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaLigneAdresse" ADD CONSTRAINT "MaLigneAdresse_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "Adresse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoyageMarque" ADD CONSTRAINT "VoyageMarque_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutocollantObtenu" ADD CONSTRAINT "AutocollantObtenu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_codePromoId_fkey" FOREIGN KEY ("codePromoId") REFERENCES "CodePromo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_carteCadeauId_fkey" FOREIGN KEY ("carteCadeauId") REFERENCES "CarteCadeau"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achat" ADD CONSTRAINT "Achat_parrainageId_fkey" FOREIGN KEY ("parrainageId") REFERENCES "Parrainage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_achatId_fkey" FOREIGN KEY ("achatId") REFERENCES "Achat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DroitEscale" ADD CONSTRAINT "DroitEscale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DroitEscale" ADD CONSTRAINT "DroitEscale_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DroitEscale" ADD CONSTRAINT "DroitEscale_achatId_fkey" FOREIGN KEY ("achatId") REFERENCES "Achat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LotEscale" ADD CONSTRAINT "LotEscale_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LotEscale" ADD CONSTRAINT "LotEscale_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retractation" ADD CONSTRAINT "Retractation_achatId_fkey" FOREIGN KEY ("achatId") REFERENCES "Achat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarteCadeau" ADD CONSTRAINT "CarteCadeau_acheteurId_fkey" FOREIGN KEY ("acheteurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parrainage" ADD CONSTRAINT "Parrainage_parrainId_fkey" FOREIGN KEY ("parrainId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parrainage" ADD CONSTRAINT "Parrainage_filleulId_fkey" FOREIGN KEY ("filleulId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pass" ADD CONSTRAINT "Pass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pass" ADD CONSTRAINT "Pass_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscriptionPrevenir" ADD CONSTRAINT "InscriptionPrevenir_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "Adresse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signalement" ADD CONSTRAINT "Signalement_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signalement" ADD CONSTRAINT "Signalement_escaleId_fkey" FOREIGN KEY ("escaleId") REFERENCES "Escale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signalement" ADD CONSTRAINT "Signalement_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "Adresse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recompense" ADD CONSTRAINT "Recompense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recompense" ADD CONSTRAINT "Recompense_codePromoId_fkey" FOREIGN KEY ("codePromoId") REFERENCES "CodePromo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalAdmin" ADD CONSTRAINT "JournalAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
