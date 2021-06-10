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

define({documentTypes:{arcgis:{caption:"Metadane ArcGIS",editorCaption:"Metadane",description:""}},emptyOption:"Puste",conditionals:{ISO19139A1_ROW4:"Jeżeli poziom hierarchii metadanych to zbiór danych, wymagane jest pole ograniczenia geograficznego lub opis geograficzny.",ISO19139A1_ROW6:"Wymagany jest identyfikator zbioru danych lub nazwa zbioru danych.",ISO19139A1_ROW7:"Jeżeli wybrano inne ograniczenia, wymagane są inne limity.",ISO19139A1_ROW9:"Jeżeli zakres nie jest zbiorem danych lub serią, wymagany jest opis poziomu.",ISO19139A1_ROW10_11_12:"Jeżeli zakres to zbiór danych lub seria, wymagane jest oświadczenie, etap procesu lub źródło danych.",ISO19139A1_ROW15:"Jeżeli wybrano dostępność punktu kontrolnego, wymagany jest opis punktu kontrolnego.",ISO19139A1_ROW18:"Jeżeli dystrybucja jest udokumentowana, wymagany jest format lub dystrybutor/format.",INSPIRE_AccessLimitation:" Wymagany jest przynajmniej jeden kod ograniczający dostęp prawny lub kod klasyfikacji bezpieczeństwa. (INSPIRE)",INSPIRE_UseLimitation:" Wymagany jest przynajmniej jeden limit użycia. (INSPIRE)",INSPIRE_ConformanceResult:"Raport spójności domeny wymaga wyniku zgodności. (INSPIRE)",INSPIRE_DomainConsistency:"Wymagany jest raport zgodności domeny. (INSPIRE)",INSPIRE_LineageStatement:"Jeżeli zakres jest zbiorem danych lub serią, wymagane jest oświadczenie pochodzenia (INSPIRE).",FGDC_DescIfTemporal:"Dla zasięgu czasowego wymagany jest opis. (FGDC)",FGDC_Keywords:"Wymagany jest temat, znacznik lub słowo kluczowe motywu. (FGDC)",FGDC_Reports:"Wymagane są raporty zgodności koncepcyjnej i kompletności. (FGDC)",FGDC_Temporal:"Wymagany jest przynajmniej jeden zasięg tymczasowy. (FGDC)",NAP_Contact:"Wymagany jest adres/punkt dostawy, nr telefonu/poczty głosowej lub zasób online/adres URL. (NAP)",GEN_BoundingBox:"Wymagane jest przynajmniej jedno pole powiązania geograficznego.",GEN_ReportResult:"Wymagany jest wynik ilościowy lub zgodności.",minLessThanMax:"Wartość minimalna musi być mniejsza niż wartość maksymalna."},hints:{integerGreaterThanZero:"(wprowadź liczbę całkowitą > 0)",integerGreaterThanOne:"(wprowadź liczbę całkowitą > 1)",integer0To100:"(wprowadź liczbę całkowitą 0–100)",maxScale:"(wprowadź liczbę całkowitą > 0, np. 50000)",minScale:"(wprowadź liczbę całkowitą > 0, np. 150000000)",number0To100:"(wprowadź liczbę 0–100)",number0To360:"(wprowadź liczbę 0–360)",number90To90:"(wprowadź liczbę –90–90)",listOfDoubles:"(wprowadź listę z liczbami, użyj spacji jako odstępu)"},htmlEditor:{button:"Edytuj..."},sections:{overview:"Przegląd",esri:"Esri",resource:"Zasób",reference:"Odniesienie",content:"Zawartość",distribution:"Dystrybucja",quality:"Jakość",eainfo:"Pola",representation:"Reprezentacja",metadata:"Metadane"},metadataStyle:{caption:"Styl metadanych ArcGIS",changeButton:"Zmień...",dialogTitle:"Wybierz styl metadanych",updating:"Aktualizowanie dokumentu...","Item Description":"Opis elementu","FGDC CSDGM Metadata":"Metadane FGDC CSDGM","ISO 19139 Metadata Implementation Specification":"Specyfikacja wdrażania metadanych ISO 19139","ISO 19139 Metadata Implementation Specification GML3.2":"Specyfikacja wdrażania metadanych ISO 19139 GML3.2","INSPIRE Metadata Directive":"Dyrektywa metadanych INSPIRE","North American Profile of ISO19115 2003":"Profil północnoamerykański ISO19115 2003"},aggrInfo:{caption:"Informacje zbiorcze",datasetHint:"Wymagany jest identyfikator zestawu danych lub nazwa zbioru danych.",aggrDSIdent:"Identyfikator zbioru danych",aggrDSName:"Nazwa zestawu danych"},appSchInfo:{caption:"Układ aplikacji",asName:"Nazwa układu",asSchLang:"Język układu",asCstLang:"Język ograniczenia",asAscii:"ASCII",asGraFile:"Plik graficzny",asGraFile_src:"Źródłowy plik graficzny",asSwDevFile:"Plik autorski oprogramowania",asSwDevFile_src:"Źródłowy plik autorski oprogramowania",asSwDevFiFt:"Format pliku autorskiego oprogramowania"},citation:{caption:"Przytoczenie",section:{titlesAndDates:"Tytuły i daty",links:"Adresy URL",identifiers:"Identyfikatory",presentation:"Forma",other:"Inne",edition:"Edycja",series:"Serie"},conditionalDate:{caption:"Data przytoczenia",msg:"Wymagana jest jedna z dat: utworzenia, publikacji lub weryfikacji.",msg_nap:"Wymagana jest data przytoczenia."},resTitle:"Tytuł",resAltTitle:"Tytuł alternatywny",resTitleForInspire:{bg:"Bulgarian (BG): РЕГЛАМЕНТ (ЕС) № 1089/2010  НА КОМИСИЯТА",cs:"Czech (CS): NAŘÍZENÍ KOMISE (EU) č. 1089/2010",da:"Danish (DA): KOMMISSIONENS FORORDNING (EU) Nr. 1089/2010",de:"German (DE): VERORDNUNG (EG) Nr. 1089/2010 DER KOMMISSION",el:"Greek (EL): ΚΑΝΟΝΙΣΜΟΣ (ΕΕ) αριθ. 1089/2010 ΤΗΣ ΕΠΙΤΡΟΠΗΣ",en:"English (EN): COMMISSION REGULATION (EU) No 1089/2010",es:"Spanish (ES): REGLAMENTO (UE) N o 1089/2010 DE LA COMISIÓN",et:"Estonian (ET): KOMISJONI MÄÄRUS (EL) nr 1089/2010",fi:"Finnish (FI): KOMISSION ASETUS (EU) N:o 1089/2010",fr:"French (FR): RÈGLEMENT (UE) No 1089/2010 DE LA COMMISSION",hr:"Croatian (HR): UREDBA KOMISIJE (EU) br. 1089/2010",hu:"Hungarian (HU): A BIZOTTSÁG 1089/2010/EU RENDELETE",it:"Italian (IT): REGOLAMENTO (UE) N. 1089/2010 DELLA COMMISSIONE",lt:"Lithuanian (LT): KOMISIJOS REGLAMENTAS (ES) Nr. 1089/2010",lv:"Latvian (LV): KOMISIJAS REGULA (ES) Nr. 1089/2010",mt:"Maltese (MT): REGOLAMENT TAL-KUMMISSJONI (UE) Nru 1089/2010",nl:"Dutch (NL): VERORDENING (EU) Nr. 1089/2010 VAN DE COMMISSIE",pl:"Polish (PL): ROZPORZĄDZENIE KOMISJI (UE) NR 1089/2010",pt:"Portuguese (PT): REGULAMENTO (UE) N. o 1089/2010 DA COMISSÃO",ro:"Romanian (RO): REGULAMENTUL (UE) NR. 1089/2010 AL COMISIEI",sk:"Slovak (SK): NARIADENIE KOMISIE (EÚ) č. 1089/2010",sl:"Slovenian (SL): UREDBA KOMISIJE (EU) št. 1089/2010",sv:"Swedish (SV): KOMMISSIONENS FÖRORDNING (EU) nr 1089/2010"},collTitle:"Tytuł zbiorczy",date:{createDate:"Data utworzenia",pubDate:"Data publikacji",reviseDate:"Data weryfikacji",notavailDate:"Data niedostępności",inforceDate:"Data wdrożeniowa",adoptDate:"Przyjęta data",deprecDate:"Data zarzucona",supersDate:"Data zastąpiona"},isbn:"ISBN",issn:"ISSN",citId:{caption:"Identyfikator",identCode:"Kod",identAuth:"Przytoczenie urzędowe"},resEd:"Edycja",resEdDate:"Data edycji",datasetSeries:{seriesName:"Nazwa",issId:"Wydanie",artPage:"Strona"},otherCitDet:"Inne szczegóły",contactCaption:"Dane kontaktowe do przytoczenia"},cntAddress:{caption:"Adres",delPoint:"Punkt dostawy",city:"Miasto",adminArea:"Region administracyjny",postCode:"Kod pocztowy",country:"Kraj",eMailAdd:"Adres e-mail",addressType:{caption:"Rodzaj adresu",postal:"Pocztowy",physical:"Fizyczny",both:"Oba"}},cntOnlineRes:{caption:"Zasób online",linkage:"Adres URL",protocol:"Protokół",appProfile:"Profil aplikacji",orName:"Nazwa",orDesc:"Opis"},cntPhone:{caption:"Telefon",voiceNum:"Poczta głosowa",faxNum:"Faks",tddtty:"TDD/TTY?"},codeRef:{caption:"Identyfikator",identCode:"Kod",idCodeSpace:"Miejsce na kod",idVersion:"Wersja",identAuth:"Przytoczenie urzędowe"},constraints:{caption:"Ograniczenia",useLimit:"Limit wykorzystania",general:{caption:"Ogólne"},legal:{caption:"Kwestie prawne",accessConsts:"Ograniczenia dostępu",useConsts:"Używaj ograniczeń",othConsts:"Inne ograniczenia"},security:{caption:"Bezpieczeństwo",classSys:"System klasyfikacji",userNote:"Notka użytkownika",handDesc:"Opis obsługi"}},contInfo:{caption:"Informacja o zawartości",section:{CovDesc:"Opis pokrycia",ImgDesc:"Opis obrazu",FetCatDesc:"Katalog obiektów"},attDesc:"Opis atrybutu",covDim:{caption:"Zakres lub pasmo",seqID:"Identyfikator sekwencyjny",seqIDType:"Typ identyfikatora sekwencyjnego",dimDescrp:"Deskryptor"},RangeDim:{caption:"Wielkość zakresu"},Band:{caption:"Pasmo",minVal:"Wartość minimalna",maxVal:"Wartość maksymalna",valUnit:"Jednostki wartości",pkResp:"Odpowiedź szczytowa",bitsPerVal:"Bitów na wartość",toneGrad:"Gradacja tonu",sclFac:"Czynnik skali",offset:"Przesunięcie"},CovDesc:{caption:"Opis pokrycia",section:{description:"Opis",rangesAndBands:"Zakresy i pasma"}},ImgDesc:{caption:"Opis obrazu",section:{description:"Opis",rangesAndBands:"Zakresy i pasma"},illElevAng:"Kąt wysokości padania światła",illAziAng:"Azymut padania światła",cloudCovPer:"Procent zachmurzenia",cmpGenQuan:"Jakość kompresji",trianInd:"Wskaźnik triangulacji?",radCalDatAv:"Dostępność danych kalibracji radiometrycznej?",camCalInAv:"Dostępność informacji o kalibracji kamery?",filmDistInAv:"Dostępność informacji o odkształceniu taśmy?",lensDistInAv:"Dostępność informacji o odkształceniu soczewki?",imagQuCode:"Kod jakości",prcTypCde:"Kod poziomu przetwarzania"},FetCatDesc:{caption:"Katalog obiektów",section:{description:"Opis",featureTypes:"Typy obiektu",citation:"Przytoczenie"},compCode:"Zgodne z normą ISO 19110?",incWithDS:"Included With Dataset?",catCitation:"Przytoczenie z katalogu obiektów",catFetTyps:{caption:"Typ obiektu",genericName:"Nazwa",codeSpace:"Miejsce na kod"}}},contact:{caption:"Kontakt",section:{name:"Nazwa kontaktu",info:"Dane kontaktowe",hoursAndInstructions:"Godziny otwarcia i instrukcje"},conditionalName:{caption:"Nazwa kontaktu",msg:"Wymagana jest nazwa indywidualna, nazwa instytucji lub nazwa pozycji.",msg_fgdc:"Wymagana jest nazwa indywidualna lub nazwa instytucji."},rpIndName:"Nazwa indywidualna",rpOrgName:"Nazwa instytucji",rpPosName:"Nazwa pozycji",rpCntInfo:"Dane kontaktowe",cntHours:"Godziny otwarcia",cntInstr:"Instrukcje dotyczące kontaktu"},distInfo:{caption:"Informacja dystrybucyjna",section:{format:"Format",distributor:"Dystrybutor",transfer:"Opcje transferu"},distFormat:{caption:"Format dystrybucji",formatName:"Nazwa formatu",formatVer:"Wersja formatu",formatAmdNum:"Numer poprawki",formatSpec:"Specyfikacja",fileDecmTech:"Technika dekompresji",formatInfo:"Treść informacji"},distributor:{caption:"Dystrybutor"},distTranOps:{caption:"Opcje transferu cyfrowego",section:{unitsAndSize:"Jednostki"},unitsODist:"Jednostki dystrybucji",transSize:"Wielkość transferu",offLineMed:{caption:"Nośnik offline",medDensity:"Gęstość",medDenUnits:"Jednostki gęstości",medVol:"Wielkości",medNote:"Notatka nośnika"}},distorOrdPrc:{caption:"Proces zamawiania",resFees:"Opłaty",planAvDtTm:"Dostępna data",planAvTmPd:{caption:"Okres z dostępną datą",tmBegin:"Data/godzina rozpoczęcia",tmEnd:"Data/godzina zakończenia"},ordInstr:"Instrukcje dotyczące zamówienia",ordTurn:"Obrót"}},dqInfo:{caption:"Jakość danych",section:{scope:"Zakres",report:"Raport",lineage:"Pochodzenie"},dqScope:{section:{level:"Poziom",extent:"Zasięg"},scpLvl:"Poziom zakresu",scpLvlDesc:"Opis poziomu",scpExt:"Granice zasięgu"},report:{section:{measure:"Pomiar",evaluation:"Oszacowanie",result:"Wynik",conformance:"Zgodność"},measDesc:"Opis pomiaru",measName:"Nazwa pomiaru",measDateTm:"Data pomiaru",measId:"Identyfikator pomiaru",evalMethDesc:"Metoda oszacowania",evalProc:"Przytoczenie procedur",ConResult:{caption:"Wynik zgodności",conExpl:"Objaśnienie",conSpec:"Specyfikacja",conPass:{caption:"Poziom",_1:"Zgodny",_0:"Niezgodny"}},QuanResult:{caption:"Wynik ilościowy",quanVal:"Wartość",quanValType:"Typ wartości",quanValUnit:"Jednostki wartości",errStat:"Statystyka błędów"}},dataLineage:{section:{statement:"Oświadczenie",dataSource:"Źródło danych",prcStep:"Etap procesu"},statement:"Oświadczenie pochodzenia",dataSource:{caption:"Źródło danych",section:{description:"Opis",srcRefSys:"System referencyjny",srcExt:"Zasięg",srcCitatn:"Przytoczenie"},srcDesc:"Opis źródła",srcScale:{rfDenom:"Denominator skali"},srcRefSys:"Źródłowy system odniesienia",srcExt:"Zasięg źródła",srcCitatn:"Przytoczenie źródeł"},prcStep:{caption:"Etap procesu",section:{description:"Opis",stepProc:"Procesor",stepSrc:"Źródło danych"},stepDesc:"Opis procesu",stepRat:"Wnioskowanie",stepDateTm:"Data etapu procesu",stepProc:"Procesor",stepSrc:"Źródło danych"}}},eainfo:{caption:"Informacja o atrybucie i obiekcie",section:{detailed:"Szczegóły",overview:"Przegląd"},detailed:{caption:"Szczegóły atrybutu i obiektu",section:{enttyp:"Obiekt",attr:"Atrybuty"},enttyp:{caption:"Typ jednostki",enttypl:"Etykieta",enttypt:"Obiekt",enttypc:"Liczba",enttypd:"Definicja",enttypds:"Źródło definicji"},attr:{caption:"Atrybut",section:{description:"Opis",value:"Wartość",domain:"Domena"},attrlabl:"Etykieta",attalias:"Alias",attrdef:"Definicja",attrdefs:"Źródło definicji",attrtype:"Typ",attwidth:"Szerokość",atprecis:"Dokładność",attscale:"Skala",atindex:"Indeksowane",attrvai:{attrva:"Objaśnienie wartości",attrvae:"Dokładność wartości"},attrmfrq:"Częstotliwość pomiaru wartości",begdatea:"Data początkowa wartości",enddatea:"Data końcowa wartości",attrdomv:{caption:"Domena",edom:{caption:"Wyliczone",edomv:"Wartość",edomvd:"Definicja",edomvds:"Źródło definicji"},rdom:{caption:"Zakres",rdommin:"Wartość minimalna",rdommax:"Wartość maksymalna",rdommean:"Średnia",rdomstdv:"Odchylenie standardowe",attrunit:"Jednostki",attrmres:"Rozdzielczość pomiarowa"},codesetd:{caption:"Zestaw kodów",codesetn:"Nazwa",codesets:"Źródło"},udom:{caption:"Nie można pokazać"}}}},overview:{caption:"Przegląd",eaover:"Podsumowanie",eadetcit:"Przytoczenie"}},extent:{caption:"Zasięg",section:{description:"Opis",geographic:"Geograficzne",temporal:"Tymczasowa",vertical:"Pionowo"},exDesc:"Opis zasięgu",geoEle:{caption:"Zasięg geograficzny",GeoBndBox:{caption:"Pole ograniczenia",esriExtentType:"Zasięg do badania?",exTypeCode:"Zasięg zawiera zasób?",westBL:"Graniczna długość geograficzna zachodnia",eastBL:"Graniczna długość geograficzna wschodnia",southBL:"Graniczna szerokość geograficzna południowa",northBL:"Graniczna szerokość geograficzna północna"},GeoDesc:{caption:"Opis geograficzny",exTypeCode:"Opis zawiera zasób?",identCode:"Kod"}},tempEle:{caption:"Zasięg tymczasowy",TM_Period:"Okres",TM_Instant:"Godzina",tmPosition:"Data",tmBegin:"Data początkowa",tmEnd:"Data końcowa"},vertEle:{caption:"Zasięg pionowy",vertMinVal:"Wartość minimalna",vertMaxVal:"Wartość maksymalna"}},graphOver:{caption:"Przeglądaj grafiki",bgFileName:"Przeglądaj adresy URL grafik",bgFileDesc:"Przeglądaj opisy graficzne",bgFileType:"Przeglądaj typ plików graficznych"},keywords:{caption:"Słowa kluczowe",section:{topicCategory:"Temat",searchKeys:"Znaczniki",themeKeys:"Motyw",placeKeys:"Miejsce",tempKeys:"Tymczasowa",discKeys:"Dyscyplina",stratKeys:"Warstwa",productKeys:"Produkt",subTopicCatKeys:"Podtemat",otherKeys:"Inne"},delimited:"Słowa kluczowe",searchKeys:"Znaczniki",themeKeys:"Słowa kluczowe motywu",placeKeys:"Słowa kluczowe miejsca",tempKeys:"Tymczasowe słowa kluczowe",discKeys:"Słowa kluczowe dyscypliny",stratKeys:"Słowa kluczowe warstwy",productKeys:"Słowa kluczowe produktu",subTopicCatKeys:"Słowa kluczowe podtematu",otherKeys:"Inne słowa kluczowe",thesaName:"Przytoczenie słownika",thesaLang:"Język słownika",gemet:"Wyszukiwanie"},locales:{caption:"Ustawienia regionalne",locale:"Ustawienia regionalne",resTitle:"Tytuł",idAbs:"Podsumowanie"},maintenance:{caption:"Konserwacja",section:{frequency:"Częstotliwość",scope:"Zakres",note:"Notatka"},usrDefFreq:"Częstotliwość niestandardowa",dateNext:"Następna aktualizacja",maintScp:"Zakres aktualizacji",upScpDesc:{caption:"Opis zakresu",attribSet:"Atrybuty",attribIntSet:"Przykłady atrybutów",featSet:"Obiekty",featIntSet:"Przykłady obiektów",datasetSet:"Zestaw danych",other:"Inne przykłady"},maintNote:"Notatka konserwacyjna",maintCont:"Kontakt konserwacji"},metadata:{section:{profile:"Profil",details:"Zakres"},mdFileID:"Identyfikator pliku",mdParentID:"Identyfikator nadrzędny",datasetURI:"Zestaw danych URI",dataSetFn:"Funkcja zestawu danych",mdDateSt:"Data metadanych",mdTimeSt:"Czas metadanych",mdLang:"Język metadanych",mdChar:"Zestaw znaków",mdHrLv:"Poziom hierarchii",mdHrLvName:"Nazwa poziomu hierarchii",mdContact:"Kontakt metadanych",mdMaint:"Konserwacja metadanych",mdConst:"Ograniczenia metadanych"},porCatInfo:{caption:"Przytoczenie obrazujące"},refSysInfo:{caption:"Odniesienie przestrzenne"},resource:{section:{citation:"Przytoczenie",details:"Szczegóły",description:"Opis",keywords:"Słowa kluczowe",status:"Status",resolution:"Rozdzielczość",representation:"Reprezentacja",browse:"Przeglądaj grafiki",format:"Format",usage:"Wykorzystanie",aggregateInfo:"Gromadzenie",additional:"Dodatkowe"},idAbs:"Opis (skrócony)",idPurp:"Podsumowanie (cel)",suppInfo:"Informacje dodatkowe",idCredit:"Udostępniający zasoby",envirDesc:"Środowisko przetwarzania",dataLang:"Język zasobu",dataExt:"Zasięg zasobu",idPoC:"Punkt kontaktowy",resMaint:"Konserwacja zasobu",resConst:"Ograniczenia zasobu",dsFormat:"Format zasobu",dataScale:{caption:"Skala danych",equScale:"Rozdzielczość skali",scaleDist:"Rozdzielczość odległości",scaleDist_value:"Odległość"},idSpecUse:{caption:"Wykorzystanie zasobów",specUsage:"Użycie specjalne",usageDate:"Data wykorzystania",usrDetLim:"Ograniczenia",usrCntInfo:"Kontakt wykorzystania"}},service:{caption:"Usługa",svType:"Typ usługi",svType_Name:"Nazwa",svAccProps:"Właściwości dostępu",svCouplRes:{caption:"Zasób podwojony",svOpName:"Nazwa operacji",svResCitId:"Identyfikator zasobu"},svCoupleType:"Typ powiązania"},scaleRange:{caption:"Zakres skali",maxScale:"Skala maksymalna",minScale:"Skala minimalna"},spatRepInfo:{caption:"Reprezentacja przestrzenna",section:{dimension:"Wymiar",parameters:"Parametry"},numDims:"Liczba wymiarów",tranParaAv:"Dostępność parametru transformacji?",axisDimension:{caption:"Wymiar",dimSize:"Rozmiar",dimResol:{caption:"Rozdzielczość",_value:"Wartość rozdzielczości",uom:"Jednostki rozdzielczości"}},VectSpatRep:{caption:"Wektor",geometObjs:"Obiekty geometryczne",geoObjCnt:"Liczba obiektów"},GridSpatRep:{caption:"Siatka"},Georect:{caption:"Georektyfikacja",section:{centerPoint:"Punkt środkowy",cornerPts:"Punkty narożne"},chkPtAv:"Dostępność punktu kontrolnego?",chkPtDesc:"Opis punktu kontrolnego",ptInPixel:"Punkt w pikselu",transDimDesc:"Opis wymiaru transformacji",transDimMap:"Tworzenie map wymiaru transformacji",cornerPts:{caption:"Punkt narożny",pos:"Położenie",gmlDesc:"Opis",gmlDescRef:"Odniesienie",gmlIdent:"Identyfikator",codeSpace:"Przestrzeń kodów identyfikatora"}},Georef:{caption:"Odniesienie geograficzne",ctrlPtAv:"Dostępność punktu kontrolnego?",orieParaAv:"Dostępność parametru położenia?",orieParaDs:"Opis parametru położenia",georefPars:"Parametry odniesienia geograficznego",paraCit:"Przytoczenie parametrów"},Indref:{caption:"Pośredni"}},booleanOptions:{_false:"Nie",_true:"Tak"},codelist:{CountryCode:"Kraj",LanguageCode:"Język",MonetaryUnits:"Jednostki monetarne",MonetaryUnits_empty:"Brak waluty uniwersalnej",PresentationForm:"Formularz prezentacji danych geoprzestrzennych FGDC",CI_PresentationFormCode:"Formularz prezentacji",CI_RoleCode:"Rola",CI_OnLineFunctionCode:"Funkcja",IMS_ContentType:"Typ zawartości",DQ_ElementDimension:"Wymiar",DQ_ElementType:"Typ raportu",DQ_EvaluationMethodTypeCode:"Typ oszacowania",DS_AssociationTypeCode:"Typ powiązania",DS_InitiativeTypeCode:"Typ inicjatywy",LI_SourceType:"Typ zasobu",MD_CellGeometryCode:"Geometria komórki",MD_CharacterSetCode:"Zestaw znaków",MD_ClassificationCode:"Klasyfikacja",MD_CoverageContentTypeCode:"Typ zawartości",MD_DimensionNameTypeCode:"Typ wymiarów",MD_GeometricObjectTypeCode:"Typ obiektów geometrycznych",MD_ImagingConditionCode:"Warunek obrazowania",MD_MaintenanceFrequenceCode:"Częstotliwość aktualizacji",MD_MediumFormatCode:"Kod formatu",MD_MediumNameCode:"Nazwa nośnika",MD_PixelOrientationCode:"Położenie pikseli",MD_ProgressCode:"Status",MD_RestrictionCode:"Kod ograniczający",MD_ScopeCode:"Zakres",MD_SpatialRepresentationTypeCode:"Typ reprezentacji przestrzennej",MD_TopicCategoryCode:"Kategoria tematów",MD_TopologyLevelCode:"Poziom topologii",RS_Dimension:"Wymiar",SV_CouplingType:"Typ powiązania",UCUM:"Jednostki",UCUM_Length:"Jednostki odległości",RS_UseLimitations:"Limit wykorzystania",RS_AccessConstraints:"Ograniczenia dostępu"}});