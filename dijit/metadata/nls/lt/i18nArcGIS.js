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

define({documentTypes:{arcgis:{caption:"ArcGIS metaduomenys",editorCaption:"Metaduomenys",description:""}},emptyOption:"Tuščias",conditionals:{ISO19139A1_ROW4:"Jei metaduomenų hierarchijos lygis yra duomenų rinkinys, reikalingas erdviškai apribotas plotas arba geografinis aprašas.",ISO19139A1_ROW6:"Reikalingas duomenų rinkinio identifikatorius arba duomenų rinkinio pavadinimas.",ISO19139A1_ROW7:"Jei pasirinktos kitos ribos, reikalingi kiti apribojimai.",ISO19139A1_ROW9:"Jei sritis yra ne duomenų rinkinys arba serijos, reikalingas lygio aprašas.",ISO19139A1_ROW10_11_12:"Jei sritis yra duomenų rinkinys arba serijos, reikalingas tvirtinimas, proceso žingsnis arba duomenų šaltinis.",ISO19139A1_ROW15:"Jei pasirinktas tikrinimo taško prieinamumas, reikalingas tikrinimo taško aprašas.",ISO19139A1_ROW18:"Jei dokumente aprašytas platinimas, reikalingas formatas arba platintojas / formatas.",INSPIRE_AccessLimitation:" Reikalingas bent vienas teisėtos prieigos apribojimo kodas arba saugos klasifikavimo kodas. (INSPIRE)",INSPIRE_UseLimitation:" Reikalingas bent vienas apribojimas. (INSPIRE)",INSPIRE_ConformanceResult:"Domeno nuoseklumo ataskaitai reikalingas atitikimo rezultatas. (INSPIRE)",INSPIRE_DomainConsistency:"Reikalinga domeno nuoseklumo ataskaita. (INSPIRE)",INSPIRE_LineageStatement:"Jei sritis yra duomenų rinkinys arba serijos, reikalingas kilmės tvirtinimas. (INSPIRE).",FGDC_DescIfTemporal:"Laiko aprėpčiai reikalingas aprašas. (FGDC)",FGDC_Keywords:"Reikalinga tema, raktinis žodis arba temos raktažodis. (FGDC)",FGDC_Reports:"Reikalingos išsamumo praleidimo ir konceptualus nuoseklumo ataskaitos. (FGDC)",FGDC_Temporal:"Reikalinga bent viena laiko aprėptis. (FGDC)",NAP_Contact:"Reikalingas adresas / pristatymo taškas, telefono / balso pašto numeris arba internetinis išteklius / URL. (NAP)",GEN_BoundingBox:"Reikalingas bent vienas erdviškai apribotas plotas.",GEN_ReportResult:"Reikalingas atitikimo arba kiekybinis rezultatas.",minLessThanMax:"Minimali reikšmė turi būti mažesnė nei maksimali reikšmė."},hints:{integerGreaterThanZero:"(įveskite sveikąjį skaičių > 0)",integerGreaterThanOne:"(įveskite sveikąjį skaičių > 1)",integer0To100:"(įveskite sveikąjį skaičių  0...100)",maxScale:"(įveskite sveikąjį skaičių > 0, pvz., 50 000)",minScale:"(įveskite sveikąjį skaičių > 0, pvz., 150 000 000)",number0To100:"(įveskite skaičių  0...100)",number0To360:"(įveskite skaičių 0...360)",number90To90:"(įveskite skaičių –90...90)",listOfDoubles:"(įveskite skaičių sąrašą, atskirkite tarpais)"},htmlEditor:{button:"Redaguoti..."},sections:{overview:"Apžvalga",esri:"Esri",resource:"Išteklius",reference:"Nuoroda",content:"Turinys",distribution:"Platinimas",quality:"Kokybė",eainfo:"Laukai",representation:"Reprezentacija",metadata:"Metaduomenys"},metadataStyle:{caption:"ArcGIS metaduomenų stilius",changeButton:"Pakeisti...",dialogTitle:"Pasirinkite metaduomenų stilių",updating:"Naujinamas dokumentas...","Item Description":"Elemento aprašas","FGDC CSDGM Metadata":"FGDC CSDGM metaduomenys","ISO 19139 Metadata Implementation Specification":"ISO 19139 metaduomenų diegimo specifikacija","ISO 19139 Metadata Implementation Specification GML3.2":"ISO 19139 metaduomenų diegimo specifikacija GML3.2","INSPIRE Metadata Directive":"INSPIRE metaduomenų direktyva","North American Profile of ISO19115 2003":"ISO19115 2003 Šiaurės Amerikos profilis"},aggrInfo:{caption:"Agreguoti informaciją",datasetHint:"Reikalingas duomenų rinkinio identifikatorius arba duomenų rinkinio pavadinimas.",aggrDSIdent:"Duomenų rinkinio identifikatorius",aggrDSName:"Duomenų rinkinio pavadinimas"},appSchInfo:{caption:"Aplikacijos schema",asName:"Schemos pavadinimas",asSchLang:"Schemos kalba",asCstLang:"Apribojimo kalba",asAscii:"ASCII",asGraFile:"Grafikos failas",asGraFile_src:"Grafikos failo šaltinis",asSwDevFile:"Programinės įrangos kūrimo failas",asSwDevFile_src:"Programinės įrangos kūrimo failo šaltinis",asSwDevFiFt:"Programinės įrangos kūrimo failo formatas"},citation:{caption:"Citavimas",section:{titlesAndDates:"Pavadinimai ir datos",links:"URL",identifiers:"Identifikatoriai",presentation:"Forma",other:"Kita",edition:"Redagavimas",series:"Serija"},conditionalDate:{caption:"Citavimo data",msg:"Reikalinga kūrimo, publikavimo arba peržiūros data.",msg_nap:"Reikalinga citavimo data."},resTitle:"Pavadinimas",resAltTitle:"Alternatyvus pavadinimas",resTitleForInspire:{bg:"Bulgarian (BG): РЕГЛАМЕНТ (ЕС) № 1089/2010  НА КОМИСИЯТА",cs:"Czech (CS): NAŘÍZENÍ KOMISE (EU) č. 1089/2010",da:"Danish (DA): KOMMISSIONENS FORORDNING (EU) Nr. 1089/2010",de:"German (DE): VERORDNUNG (EG) Nr. 1089/2010 DER KOMMISSION",el:"Greek (EL): ΚΑΝΟΝΙΣΜΟΣ (ΕΕ) αριθ. 1089/2010 ΤΗΣ ΕΠΙΤΡΟΠΗΣ",en:"English (EN): COMMISSION REGULATION (EU) No 1089/2010",es:"Spanish (ES): REGLAMENTO (UE) N o 1089/2010 DE LA COMISIÓN",et:"Estonian (ET): KOMISJONI MÄÄRUS (EL) nr 1089/2010",fi:"Finnish (FI): KOMISSION ASETUS (EU) N:o 1089/2010",fr:"French (FR): RÈGLEMENT (UE) No 1089/2010 DE LA COMMISSION",hr:"Croatian (HR): UREDBA KOMISIJE (EU) br. 1089/2010",hu:"Hungarian (HU): A BIZOTTSÁG 1089/2010/EU RENDELETE",it:"Italian (IT): REGOLAMENTO (UE) N. 1089/2010 DELLA COMMISSIONE",lt:"Lithuanian (LT): KOMISIJOS REGLAMENTAS (ES) Nr. 1089/2010",lv:"Latvian (LV): KOMISIJAS REGULA (ES) Nr. 1089/2010",mt:"Maltese (MT): REGOLAMENT TAL-KUMMISSJONI (UE) Nru 1089/2010",nl:"Dutch (NL): VERORDENING (EU) Nr. 1089/2010 VAN DE COMMISSIE",pl:"Polish (PL): ROZPORZĄDZENIE KOMISJI (UE) NR 1089/2010",pt:"Portuguese (PT): REGULAMENTO (UE) N. o 1089/2010 DA COMISSÃO",ro:"Romanian (RO): REGULAMENTUL (UE) NR. 1089/2010 AL COMISIEI",sk:"Slovak (SK): NARIADENIE KOMISIE (EÚ) č. 1089/2010",sl:"Slovenian (SL): UREDBA KOMISIJE (EU) št. 1089/2010",sv:"Swedish (SV): KOMMISSIONENS FÖRORDNING (EU) nr 1089/2010"},collTitle:"Bendras pavadinimas",date:{createDate:"Kūrimo data",pubDate:"Publikavimo data",reviseDate:"Peržiūros data",notavailDate:"Neprieinamumo data",inforceDate:"Įsigaliojimo data",adoptDate:"Priėmimo data",deprecDate:"Nebenaudojimo data",supersDate:"Pakeitimo data"},isbn:"ISBN",issn:"ISSN",citId:{caption:"Identifikatorius",identCode:"Kodas",identAuth:"Autoritetingo šaltinio citavimas"},resEd:"Redagavimas",resEdDate:"Redagavimo data",datasetSeries:{seriesName:"Pavadinimas",issId:"Leidimas",artPage:"Puslapis"},otherCitDet:"Kita išsami informacija",contactCaption:"Citavimo kontaktinė informacija"},cntAddress:{caption:"Adresas",delPoint:"Pristatymo taškas",city:"Miestas",adminArea:"Administracinė sritis",postCode:"Pašto kodas",country:"Šalis",eMailAdd:"El. paštas",addressType:{caption:"Adreso tipas",postal:"Pašto",physical:"Fizinis",both:"Abu"}},cntOnlineRes:{caption:"Internetinis išteklius",linkage:"URL",protocol:"Protokolas",appProfile:"Aplikacijos profilis",orName:"Pavadinimas",orDesc:"Aprašas"},cntPhone:{caption:"Telefonas",voiceNum:"Balso paštas",faxNum:"Faksas",tddtty:"TDD / TTY?"},codeRef:{caption:"Identifikatorius",identCode:"Kodas",idCodeSpace:"Kodo vieta",idVersion:"Versija",identAuth:"Autoritetingo šaltinio citavimas"},constraints:{caption:"Apribojimai",useLimit:"Naudoti apribojimą",general:{caption:"Bendri"},legal:{caption:"Teisės",accessConsts:"Prieigos apribojimai",useConsts:"Naudojimo apribojimai",othConsts:"Kiti apribojimai"},security:{caption:"Sauga",classSys:"Klasifikavimo sistema",userNote:"Naudotojo pastaba",handDesc:"Valdymo aprašas"}},contInfo:{caption:"Turinio informacija",section:{CovDesc:"Padengimo aprašas",ImgDesc:"Vaizdo aprašas",FetCatDesc:"Funkcijų katalogas"},attDesc:"Atributų aprašas",covDim:{caption:"Klasė arba juosta",seqID:"Sekos identifikatorius",seqIDType:"Sekos identifikatoriaus tipas",dimDescrp:"Aprašas"},RangeDim:{caption:"Klasės matmuo"},Band:{caption:"Juosta",minVal:"Minimali reikšmė",maxVal:"Maksimali reikšmė",valUnit:"Reikšmės vienetai",pkResp:"Aukščiausio taško atsakas",bitsPerVal:"Bitų vienoje reikšmėje skaičius",toneGrad:"Laipsniškas tonų perėjimas",sclFac:"Mastelio pakopa",offset:"Poslinkis"},CovDesc:{caption:"Padengimo aprašas",section:{description:"Aprašas",rangesAndBands:"Klasės ir juostos"}},ImgDesc:{caption:"Vaizdo aprašas",section:{description:"Aprašas",rangesAndBands:"Klasės ir juostos"},illElevAng:"Apšvietimo aukščio kampas",illAziAng:"Apšvietimo azimuto kampas",cloudCovPer:"Padengimo debesimis procentas",cmpGenQuan:"Suglaudinimo kokybė",trianInd:"Trianguliacijos indikatorius?",radCalDatAv:"Radiometrinių kalibravimo duomenų prieinamumas?",camCalInAv:"Vaizdo kameros kalibravimo informacijos prieinamumas?",filmDistInAv:"Juostos iškraipymo informacijos prieinamumas?",lensDistInAv:"Objektyvų iškraipymo informacijos prieinamumas?",imagQuCode:"Kokybės kodas",prcTypCde:"Apdorojimo lygio kodas"},FetCatDesc:{caption:"Funkcijų katalogas",section:{description:"Aprašas",featureTypes:"Funkcijų tipai",citation:"Citavimas"},compCode:"Atitinka ISO 19110?",incWithDS:"Included With Dataset?",catCitation:"Funkcijų katalogo citavimas",catFetTyps:{caption:"Elemento tipas",genericName:"Pavadinimas",codeSpace:"Kodo vieta"}}},contact:{caption:"Kontaktas",section:{name:"Kontaktinio asmens vardas, pavardė",info:"Kontaktinė informacija",hoursAndInstructions:"Valandos ir instrukcijos"},conditionalName:{caption:"Kontaktinio asmens vardas, pavardė",msg:"Reikalingas asmens vardas, organizacijos pavadinimas arba pareigos.",msg_fgdc:"Reikalingas asmens vardas arba organizacijos pavadinimas."},rpIndName:"Asmens vardas",rpOrgName:"Organizacijos pavadinimas",rpPosName:"Pareigos",rpCntInfo:"Kontaktinė informacija",cntHours:"Aptarnavimo valandos",cntInstr:"Kontaktinės informacijos instrukcijos"},distInfo:{caption:"Platinimo informacija",section:{format:"Formatuoti",distributor:"Platintojas",transfer:"Perkėlimo parinktys"},distFormat:{caption:"Platinimo formatas",formatName:"Formato pavadinimas",formatVer:"Formato versija",formatAmdNum:"Pataisymo numeris",formatSpec:"Specifikacija",fileDecmTech:"Dekompresijos technika",formatInfo:"Informacijos turinys"},distributor:{caption:"Platintojas"},distTranOps:{caption:"Skaitmeninio perkėlimo parinktys",section:{unitsAndSize:"Vienetai"},unitsODist:"Platinimo vienetai",transSize:"Perkėlimo dydis",offLineMed:{caption:"Atjungta laikmena",medDensity:"Tankumas",medDenUnits:"Tankio vienetai",medVol:"Kiekiai",medNote:"Tarpinė pastaba"}},distorOrdPrc:{caption:"Užsakymo procesas",resFees:"Mokesčiai",planAvDtTm:"Prieinamumo data",planAvTmPd:{caption:"Prieinamumo datų laikotarpis",tmBegin:"Pradžios data / laikas",tmEnd:"Pabaigos data / laikas"},ordInstr:"Užsakymo instrukcijos",ordTurn:"Ciklinis vykdymas"}},dqInfo:{caption:"Duomenų kokybė",section:{scope:"Sritis",report:"Ataskaita",lineage:"Kilmė"},dqScope:{section:{level:"Lygis",extent:"Aprėptis"},scpLvl:"Srities lygis",scpLvlDesc:"Lygio aprašas",scpExt:"Srities aprėptis"},report:{section:{measure:"Matuoti",evaluation:"Vertinimas",result:"Rezultatas",conformance:"Atitikimas"},measDesc:"Matavimo aprašas",measName:"Matavimo pavadinimas",measDateTm:"Matavimo data",measId:"Matavimo identifikatorius",evalMethDesc:"Vertinimo metodas",evalProc:"Procedūros citavimas",ConResult:{caption:"Atitikimo rezultatas",conExpl:"Paaiškinimas",conSpec:"Specifikacija",conPass:{caption:"Laipsnis",_1:"Atitinka",_0:"Neatitinka"}},QuanResult:{caption:"Kiekybinis rezultatas",quanVal:"Reikšmė",quanValType:"Reikšmės tipas",quanValUnit:"Reikšmės vienetai",errStat:"Klaidų statistika"}},dataLineage:{section:{statement:"Tvirtinimas",dataSource:"Duomenų šaltinis",prcStep:"Proceso žingsnis"},statement:"Kilmės tvirtinimas",dataSource:{caption:"Duomenų šaltinis",section:{description:"Aprašas",srcRefSys:"Nuorodinė sistema",srcExt:"Aprėptis",srcCitatn:"Citavimas"},srcDesc:"Šaltinio aprašas",srcScale:{rfDenom:"Mastelio daliklis"},srcRefSys:"Šaltinio nuorodinė sistema",srcExt:"Šaltinio aprėptis",srcCitatn:"Šaltinio citavimas"},prcStep:{caption:"Proceso žingsnis",section:{description:"Aprašas",stepProc:"Apdorotojas",stepSrc:"Duomenų šaltinis"},stepDesc:"Proceso aprašas",stepRat:"Loginis",stepDateTm:"Proceso žingsnio data",stepProc:"Apdorotojas",stepSrc:"Duomenų šaltinis"}}},eainfo:{caption:"Subjektas ir atributinė informacija",section:{detailed:"Išsamiau",overview:"Apžvalga"},detailed:{caption:"Subjektas ir išsami atributinė informacija",section:{enttyp:"Subjektas",attr:"Atributai"},enttyp:{caption:"Subjekto tipas",enttypl:"Žymė",enttypt:"Objektas",enttypc:"Viso",enttypd:"Apibrėžimas",enttypds:"Apibrėžimo šaltinis"},attr:{caption:"Atributas",section:{description:"Aprašas",value:"Reikšmė",domain:"Domenas"},attrlabl:"Žymė",attalias:"Pseudonimas",attrdef:"Apibrėžimas",attrdefs:"Apibrėžimo šaltinis",attrtype:"Tipas",attwidth:"Plotis",atprecis:"Tikslumas",attscale:"Mastelis",atindex:"Indeksuota",attrvai:{attrva:"Reikšmės paaiškinimas",attrvae:"Reikšmės tikslumas"},attrmfrq:"Reikšmės matavimo dažnis",begdatea:"Reikšmių pradžios data",enddatea:"Reikšmių pabaigos data",attrdomv:{caption:"Domenas",edom:{caption:"Išvardyta",edomv:"Reikšmė",edomvd:"Apibrėžimas",edomvds:"Apibrėžimo šaltinis"},rdom:{caption:"Intervalas",rdommin:"Minimali reikšmė",rdommax:"Maksimali reikšmė",rdommean:"Vidurkis",rdomstdv:"Standartinis nuokrypis",attrunit:"Vienetai",attrmres:"Matavimo raiška"},codesetd:{caption:"Kodų rinkinys",codesetn:"Pavadinimas",codesets:"Šaltinis"},udom:{caption:"Nereprezentuojamas"}}}},overview:{caption:"Apžvalga",eaover:"Santrauka",eadetcit:"Citavimas"}},extent:{caption:"Aprėptis",section:{description:"Aprašas",geographic:"Geografinis",temporal:"Laiko",vertical:"Vertikaliai"},exDesc:"Aprėpties aprašas",geoEle:{caption:"Erdvinė aprėptis",GeoBndBox:{caption:"Apribotas plotas",esriExtentType:"Ieškojimo aprėptis?",exTypeCode:"Aprėptyje yra išteklius?",westBL:"Ilgumos vakarinė riba",eastBL:"Ilgumos rytinė riba",southBL:"Platumos pietinė riba",northBL:"Platumos šiaurinė riba"},GeoDesc:{caption:"Geografinis aprašas",exTypeCode:"Apraše yra išteklius?",identCode:"Kodas"}},tempEle:{caption:"Laiko aprėptis",TM_Period:"Laikotarpis",TM_Instant:"Greitu laiku",tmPosition:"Data",tmBegin:"Pradžios data",tmEnd:"Pabaigos data"},vertEle:{caption:"Vertikali aprėptis",vertMinVal:"Minimali reikšmė",vertMaxVal:"Maksimali reikšmė"}},graphOver:{caption:"Naršymo grafika",bgFileName:"Naršymo grafikos URL",bgFileDesc:"Naršymo grafikos aprašas",bgFileType:"Naršymo grafikos failo tipas"},keywords:{caption:"Raktažodžiai",section:{topicCategory:"Tema",searchKeys:"Raktažodžiai",themeKeys:"Apipavidalinimas",placeKeys:"Padėtis",tempKeys:"Laiko",discKeys:"Dalykas",stratKeys:"Sluoksnis",productKeys:"Produktas",subTopicCatKeys:"Antrinė tema",otherKeys:"Kita"},delimited:"Raktažodžiai",searchKeys:"Raktažodžiai",themeKeys:"Temos raktažodžiai",placeKeys:"Vietos raktažodžiai",tempKeys:"Laikini raktažodžiai",discKeys:"Dalyko raktažodžiai",stratKeys:"Sluoksnio raktažodžiai",productKeys:"Produkto raktažodžiai",subTopicCatKeys:"Antrinės temos raktažodžiai",otherKeys:"Kiti raktažodžiai",thesaName:"Žodyno citavimas",thesaLang:"Žodyno kalba",gemet:"Paieška"},locales:{caption:"Lokalės",locale:"Lokalė",resTitle:"Pavadinimas",idAbs:"Santrauka"},maintenance:{caption:"Priežiūra",section:{frequency:"Dažnis",scope:"Sritis",note:"Pastaba"},usrDefFreq:"Adaptuotas dažnis",dateNext:"Kitas atnaujinimas",maintScp:"Atnaujinimo sritis",upScpDesc:{caption:"Srities aprašas",attribSet:"Atributai",attribIntSet:"Atributų pavyzdžiai",featSet:"Elementai",featIntSet:"Funkcijų pavyzdžiai",datasetSet:"Duomenų rinkinys",other:"Kiti pavyzdžiai"},maintNote:"Priežiūros pastaba",maintCont:"Priežiūros kontaktinis asmuo"},metadata:{section:{profile:"Profilis",details:"Sritis"},mdFileID:"Failo identifikatorius",mdParentID:"Pagrindinis identifikatorius",datasetURI:"Duomenų rinkinio URI",dataSetFn:"Duomenų rinkinio funkcija",mdDateSt:"Metaduomenų data",mdTimeSt:"Metaduomenų laikas",mdLang:"Metaduomenų kalba",mdChar:"Simbolių rinkinys",mdHrLv:"Hierarchijos lygis",mdHrLvName:"Hierarchijos lygio pavadinimas",mdContact:"Metaduomenų kontaktas",mdMaint:"Metaduomenų priežiūra",mdConst:"Metaduomenų apribojimai"},porCatInfo:{caption:"Atvaizdavimo citavimas"},refSysInfo:{caption:"Koordinačių sistema"},resource:{section:{citation:"Citavimas",details:"Išsamiau",description:"Aprašas",keywords:"Raktažodžiai",status:"Būsena",resolution:"Sprendimas",representation:"Reprezentacija",browse:"Naršymo grafika",format:"Formatuoti",usage:"Naudojimas",aggregateInfo:"Agregavimas",additional:"Papildoma"},idAbs:"Aprašas (abstraktus)",idPurp:"Santrauka (paskirtis)",suppInfo:"Papildoma informacija",idCredit:"Autoriai",envirDesc:"Apdorojimo aplinka",dataLang:"Išteklių kalba",dataExt:"Išteklių aprėptis",idPoC:"Kontakto taškas",resMaint:"Išteklių priežiūra",resConst:"Išteklių apribojimai",dsFormat:"Išteklių formatas",dataScale:{caption:"Duomenų mastelis",equScale:"Mastelio raiška",scaleDist:"Atstumo raiška",scaleDist_value:"Atstumas"},idSpecUse:{caption:"Išteklių naudojimas",specUsage:"Specifinis naudojimas",usageDate:"Naudojimo data",usrDetLim:"Apribojimai",usrCntInfo:"Naudojimo kontaktas"}},service:{caption:"Paslauga",svType:"Paslaugos tipas",svType_Name:"Pavadinimas",svAccProps:"Prieigos nustatymai",svCouplRes:{caption:"Sujungti ištekliai",svOpName:"Veiksmo pavadinimas",svResCitId:"Išteklių identifikatorius"},svCoupleType:"Sujungimo tipas"},scaleRange:{caption:"Mastelių intervalas",maxScale:"Maksimalus mastelis",minScale:"Minimalus mastelis"},spatRepInfo:{caption:"Erdvinė reprezentacija",section:{dimension:"Matmuo",parameters:"Parametrai"},numDims:"Matmenų skaičius",tranParaAv:"Transformacijos parametro prieinamumas?",axisDimension:{caption:"Matmuo",dimSize:"Dydžius",dimResol:{caption:"Sprendimas",_value:"Sprendimo reikšmė",uom:"Sprendimo vienetai"}},VectSpatRep:{caption:"Vektorius",geometObjs:"Geometriniai objektai",geoObjCnt:"Objektų skaičius"},GridSpatRep:{caption:"Tinklelis"},Georect:{caption:"Geografiškai pakoreguoti",section:{centerPoint:"Centro taškas",cornerPts:"Kampo taškai"},chkPtAv:"Tikrinimo taško prieinamumas?",chkPtDesc:"Tikrinimo taško aprašas",ptInPixel:"Taškas pikseliais",transDimDesc:"Transformacijos matmenų aprašas",transDimMap:"Transformacijos matmenų žemėlapių kūrimas",cornerPts:{caption:"Kampo taškas",pos:"Padėtis",gmlDesc:"Aprašas",gmlDescRef:"Nuoroda",gmlIdent:"Identifikatorius",codeSpace:"Identifikatoriaus kodo vieta"}},Georef:{caption:"Nurodoma erdviškai",ctrlPtAv:"Kontrolinio taško prieinamumas?",orieParaAv:"Padėties parametrų prieinamumas?",orieParaDs:"Padėties parametrų aprašas",georefPars:"Erdviškai nurodomi parametrai",paraCit:"Parametrų citavimas"},Indref:{caption:"Netiesioginis"}},booleanOptions:{_false:"Ne",_true:"Taip"},codelist:{CountryCode:"Šalis",LanguageCode:"Kalba",MonetaryUnits:"Piniginiai vienetai",MonetaryUnits_empty:"Nėra universalios valiutos",PresentationForm:"FGDC erdvinės informacijos duomenų pristatymo forma",CI_PresentationFormCode:"Pristatymo forma",CI_RoleCode:"Rolė",CI_OnLineFunctionCode:"Funkcija",IMS_ContentType:"Turinio tipas",DQ_ElementDimension:"Matmuo",DQ_ElementType:"Ataskaitos tipas",DQ_EvaluationMethodTypeCode:"Vertinimo tipas",DS_AssociationTypeCode:"Asociacijos tipas",DS_InitiativeTypeCode:"Iniciatyvos tipas",LI_SourceType:"Šaltinio tipas",MD_CellGeometryCode:"Gardelių geometrija",MD_CharacterSetCode:"Simbolių rinkinys",MD_ClassificationCode:"Klasifikacija",MD_CoverageContentTypeCode:"Turinio tipas",MD_DimensionNameTypeCode:"Matmenų tipas",MD_GeometricObjectTypeCode:"Geometrinio objekto tipas",MD_ImagingConditionCode:"Atvaizdavimo sąlyga",MD_MaintenanceFrequenceCode:"Atnaujinimų dažnis",MD_MediumFormatCode:"Formato kodas",MD_MediumNameCode:"Laikmenos pavadinimas",MD_PixelOrientationCode:"Pikselių išdėstymas",MD_ProgressCode:"Būsena",MD_RestrictionCode:"Apribojimo kodas",MD_ScopeCode:"Sritis",MD_SpatialRepresentationTypeCode:"Erdvinės reprezentacijos tipas",MD_TopicCategoryCode:"Temų kategorija",MD_TopologyLevelCode:"Topologijos lygis",RS_Dimension:"Matmuo",SV_CouplingType:"Sujungimo tipas",UCUM:"Vienetai",UCUM_Length:"Atstumo vienetai",RS_UseLimitations:"Naudojimo ribojimai",RS_AccessConstraints:"Prieigos apribojimai"}});