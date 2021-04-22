// COPYRIGHT © 2021 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.36/esri/copyright.txt for details.

define({documentTypes:{data:{caption:"INSPIRE (Datum)",description:""},service:{caption:"INSPIRE (Usluga)",description:""}},dataThemeKeywords:{caption:"Tema podataka Inspire"},inspireServiceType:{discovery:"Usluga otkrivanja",view:"Usluga prikaza",download:"Usluga preuzimanja",transformation:"Usluga transformacije",invoke:"Usluga dozivanja",other:"Ostale usluge"},keywordSections:{dataTheme:"Tema podataka Inspire",serviceCategory:"ISO 19119 kategorija usluge",gemetConcept:"Koncept GEMET",otherKeywords:"Ostale ključne riječi"},LanguageCode:{bul:"Bugarski",cze:"Češki",dan:"Danski",dut:"Nizozemski",eng:"Engleski",est:"Estonski",fin:"Finski",fre:"Francuski",ger:"Njemački",gre:"Grčki",hun:"Mađarski",gle:"Gaelski (irski)",ita:"Talijanski",lav:"Latvijski",lit:"Litavski",mlt:"Malteški",pol:"Poljski",por:"Portugalski",rum:"Rumunjski",slo:"Slovački",slv:"Slovenski",spa:"Španjolski",swe:"Švedski",chi:"Kineski",kor:"Korejski",nor:"Norveški",rus:"Ruski",tur:"Turski"},otherConstraints:{noLimitations:"Nema ograničenja",confidentialityOfProceedings:"Povjerljivost postupaka javnih tijela...",internationalRelations:"Međunarodni odnosi, javna sigurnost ili država obrana",courseOfJustice:"Tijek pravde, mogućnost da svaka osoba ima pošteno suđenje...",confidentialityOfCommercial:"Povjerljivost komercijalnih ili industrijskih podataka...",intellectualProperty:"Prava intelektualnog vlasništva",confidentialityOfPersonalData:"Povjerljivost osobnih podataka i/ili datoteka...",interestsOrProtection:"Interesi ili zaštita svake osobe koja je dala podatke...",protectionOfEnvironment:"Zaštita okoliša na koje se takvi podaci odnose...",freeText:"Slobodan tekst"},serviceType:{humanInteractionService:"100 Usluge geografske interakcije ljudi",humanCatalogueViewer:"101 Preglednik kataloga",humanGeographicViewer:"102 Geografski preglednik",humanGeographicSpreadsheetViewer:"103 Preglednik geografske proračunske tablice",humanServiceEditor:"104 Uređivač usluga",humanChainDefinitionEditor:"105 Uređivač definicije lanca",humanWorkflowEnactmentManager:"106 Upravitelj provođenja radnog tijeka",humanGeographicFeatureEditor:"107 Uređivač geoobjekata",humanGeographicSymbolEditor:"108 Uređivač geografskih simbola ",humanFeatureGeneralizationEditor:"109 Uređivač generalizacije geoobjekata",humanGeographicDataStructureViewer:"110 Preglednik strukture geografskih podataka",infoManagementService:"200 Usluga upravljanja geografskim modelom/podacima",infoFeatureAccessService:"201 Usluga pristupa geoobjektima",infoMapAccessService:"202 Usluga pristupa karti",infoCoverageAccessService:"203 Usluga pristupa pokrovu",infoSensorDescriptionService:"204 Usluga opisa senzora",infoProductAccessService:"205 Usluga pristupa proizvodima",infoFeatureTypeService:"206 Usluga vrste geoobjekta",infoCatalogueService:"207 Usluga kataloga",infoRegistryService:"208 Usluga registra",infoGazetteerService:"209 Usluga Gazetteer",infoOrderHandlingService:"210 Usluga rukovanja narudžbom",infoStandingOrderService:"211 Usluga trajnog naloga",taskManagementService:"300 Usluge upravljanja geografskim radnim tijekom/zadacima",chainDefinitionService:"301 Usluga definicije lanca",workflowEnactmentService:"302 Usluga provođenja radnog tijeka",subscriptionService:"303 Usluga pretplate",spatialProcessingService:"400 Usluge geografske obrade - prostorne",spatialCoordinateConversionService:"401 Usluga pretvorbe koordinata",spatialCoordinateTransformationService:"402 Usluga transformacije koordinata",spatialCoverageVectorConversionService:"403 Usluga pretvorbe pokrov/vektor",spatialImageCoordinateConversionService:"404 Usluga pretvorbe koordinata slike",spatialRectificationService:"405 Usluga rektifikacije",spatialOrthorectificationService:"406 Usluga ortorektifikacije",spatialSensorGeometryModelAdjustmentService:"407 Usluga podešavanja geometrijskog modela senzora",spatialImageGeometryModelConversionService:"408 Usluga pretvorbe geometrijskog modela slike",spatialSubsettingService:"409 Usluga podskupa",spatialSamplingService:"410 Usluga uzorkovanja",spatialTilingChangeService:"411 Usluga mijenjanja ploča",spatialDimensionMeasurementService:"412 Usluga mjerenja dimenzija",spatialFeatureManipulationService:"413 Usluga manipulacije geoobjektima",spatialFeatureMatchingService:"414 Usluga podudaranja geoobjekata",spatialFeatureGeneralizationService:"415 Usluga generalizacije geoobjekata",spatialRouteDeterminationService:"416 Usluga utvrđivanja rute",spatialPositioningService:"417 Usluga pozicioniranja",spatialProximityAnalysisService:"418 Usluga analize blizine",thematicProcessingService:"500 Usluge geografske obrade - tematske",thematicGoparameterCalculationService:"501 Usluga izračuna geoparametra",thematicClassificationService:"502 Usluga tematske klasifikacije",thematicFeatureGeneralizationService:"503 Usluga generalizacije geoobjekata",thematicSubsettingService:"504 Usluga podskupa",thematicSpatialCountingService:"505 Usluga prostornog brojanja",thematicChangeDetectionService:"506 Usluga otkrivanja promjena",thematicGeographicInformationExtractionService:"507 Usluge vađenja geografskih podataka",thematicImageProcessingService:"508 Usluga obrade slike",thematicReducedResolutionGenerationService:"509 Usluga stvaranja manje razlučivosti",thematicImageManipulationService:"510 Usluga manipulacije slikama",thematicImageUnderstandingService:"511 Usluge za razumijevanje slika",thematicImageSynthesisService:"512 Usluge za sintezu slika",thematicMultibandImageManipulationService:"513 Manipulacija višekanalnim slikama",thematicObjectDetectionService:"514 Usluga otkrivanja predmeta",thematicGeoparsingService:"515 Usluga geografskog raščlanjivanja",thematicGeocodingService:"516 Usluga geokodiranja",temporalProcessingService:"600 Usluge geografske obrade - vremenske",temporalReferenceSystemTransformationService:"601 Usluge transformacije vremenskog referentnog sustava",temporalSubsettingService:"602 Usluga podskupa",temporalSamplingService:"603 Usluga uzorkovanja",temporalProximityAnalysisService:"604 Usluga analize vremenske udaljenosti",metadataProcessingService:"700 Usluge geografske obrade - metapodaci",metadataStatisticalCalculationService:"701 Usluga statističkog izračunavanja",metadataGeographicAnnotationService:"702 Usluge bilježenja geografskih podataka",comService:"800 Usluge geografskih komunikacija",comEncodingService:"801 Usluga kodiranja",comTransferService:"802 Usluga prijenosa",comGeographicCompressionService:"803 Usluga geografske kompresije",comGeographicFormatConversionService:"804 Usluga pretvorbe formata geografskih podataka",comMessagingService:"805 Usluga za razmjenu poruka",comRemoteFileAndExecutableManagement:"806 Udaljena datoteka i izvršivo upravljanje"},useLimitation:{noCondition:"Ne primjenjuju se uvjeti",unknownCondition:"Nepoznati uvjeti",freeText:"Slobodan tekst"}});