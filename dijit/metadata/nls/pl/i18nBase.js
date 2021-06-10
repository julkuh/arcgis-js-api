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

define({general:{cancel:"Anuluj",close:"Zamknij",none:"Brak",ok:"OK",other:"Inny",stamp:"Znacznik",now:"Teraz",choose:"Wybierz jeden:"},editor:{noMetadata:"Brak metadanych dla tego elementu.",xmlViewOnly:"Typ metadanych powiązany z tym elementem nie jest obsługiwany przez edytor. Metadane muszą być w formacie ArcGIS.",editorDialog:{caption:"Metadane",captionPattern:"Metadane dla {title}"},primaryToolbar:{view:"Wyświetl",viewXml:"Wyświetl XML",edit:"Edycja",initializing:"Wczytywanie...",startingEditor:"Uruchamianie edytora...",loadingDocument:"Wczytywanie dokumentu...",updatingDocument:"Aktualizowanie dokumentu...",generatingView:"Generowanie widoku...",errors:{errorGeneratingView:"Podczas generowania widoku wystąpił błąd",errorLoadingDocument:"Podczas wczytywania dokumentu wystąpił błąd."}},changesNotSaved:{prompt:"Dokument zawiera niezapisane zmiany.",dialogTitle:"Zamknij edytor metadanych",closeButton:"Zamknij"},download:{caption:"Pobierz",dialogTitle:"Pobierz",prompt:"Kliknij tutaj, aby pobrać plik."},load:{caption:"Otwórz",dialogTitle:"Otwórz",typeTab:"Nowy dokument",fileTab:"Otwórz plik",templateTab:"Szablon",itemTab:"Twój element",filePrompt:"Wybierz lokalny plik XML metadanych ArcGIS. Metadane muszą być w formacie ArcGIS.",templatePrompt:"Utwórz metadane",pullItem:"Wypełnij metadane szczegółami elementu.",importWarning:"Wybrany plik nie wydaje się być w formacie ArcGIS. Wczytywane metadane muszą być w formacie ArcGIS.",loading:"Wczytywanie...",noMetadata:"Metadane dla tego elementu można utworzyć, wybierając jedną z poniższych opcji.",unrecognizedMetadata:"Typ metadanych powiązanych z tym obiektem nie jest obsługiwany przez edytor. Obsługiwane metadane można określić, wybierając jedną z poniższych opcji.",errorLoading:"Podczas wczytywania wystąpił błąd.",warnings:{badFile:"Nie można wczytać wybranego pliku.",notAnXml:"Wybrany plik nie jest plikiem XML.",notSupported:"Plik tego typu nie jest obsługiwany."},portalCaption:"Zastąp"},save:{caption:"Zapisz",dialogTitle:"Zapisz metadane",working:"Zapisywanie metadanych...",errorSaving:"Wystąpił błąd, metadane nie zostały zapisane.",saveDialog:{pushCaption:"Zastosuj zmiany w elemencie"}},saveAndClose:{caption:"Zapisz i zamknij"},saveDraft:{caption:"Pobierz",dialogTitle:"Pobierz"},validate:{caption:"Sprawdź poprawność",dialogTitle:"Sprawdzanie poprawności",docIsValid:"Dokument jest właściwy."},viewHtml:{caption:"Wyświetl",dialogTitle:"Wyświetl Metadane",savePrompt:"Dokument zawiera niezapisane zmiany. Należy zapisać zmiany, aby były widoczne podczas wyświetlania metadanych.",saveButton:"Zapisz i wyświetl",portalNone:"Nie utworzono metadanych opartych na standardach. Przed wyświetleniem metadanych należy je zapisać."},del:{caption:"Usuń",dialogTitle:"Usuń metadane",prompt:"Czy na pewno usunąć te metadane?",working:"Usuwanie metadanych...",errorDeleting:"Wystąpił błąd, metadane nie zostały usunięte.",portalNone:"Brak dokumentu metadanych do usunięcia. Nie utworzono metadanych opartych na standardach.",portalPrompt:"Spowoduje to usunięcie dokumentu metadanych oraz zresetowanie metadanych elementu i przypisanie im takich informacji o elemencie, jak tytuł, opis itp.",portalPrompt2:"Spowoduje to usunięcie metadanych opartych na standardach. Czy na pewno usunąć te metadane?",portalButton:"Usuń i zamknij"},transform:{caption:"Transformuj",dialogTitle:"Transformuj w",prompt:"",working:"Transformowanie...",errorTransforming:"Podczas transformowania dokumentu wystąpił błąd."},errorDialog:{dialogTitle:"Wystąpił błąd"}},arcgis:{portal:{metadataButton:{caption:"Metadane"}}},calendar:{button:"Kalendarz...",title:"Kalendarz"},geoExtent:{button:"Skonfiguruj zasięg geograficzny...",title:"Zasięg geograficzny",navigate:"Nawigacja",draw:"Narysuj prostokąt",drawHint:"Naciśnij, aby zacząć i zwolnij, aby zakończyć."},hints:{date:"(rrrr lub rrrr-mm lub rrrr-mm-dd)",dateTime:"(rrrr-mm-ddTgg:mm:ss.sss[+-]gg:mm)",dateOrDateTime:"(rrrr lub rrrr-mm lub rrrr-mm-dd lub rrrr-mm-ddTgg:mm:ss.sss[+-]gg:mm)",delimitedTextArea:"(rozdziel za pomocą przecinka lub znaku nowego wiersza)",fgdcDate:"(rrrr lub rrrr-mm lub rrrr-mm-dd)",fgdcTime:"(gg:mm:ss.sss[+-]gg:mm)",integer:"(wprowadź liczbę całkowitą)",latitude:"(stopnie dziesiętne)",longitude:"(stopnie dziesiętne)",number:"(wprowadź liczbę)",numberGreaterThanZero:"(wprowadź liczbę > 0)"},isoTopicCategoryCode:{caption:"Kategorie tematów",boundaries:"Granice administracyjne i polityczne",farming:"Rolnictwo i uprawy",climatologyMeteorologyAtmosphere:"Atmosfera i klimat",biota:"Biologia i ekologia",economy:"Biznes i gospodarka",planningCadastre:"Kataster",society:"Kultura, społeczeństwo i demografia",elevation:"Dane wysokościowe i produkty pochodne",environment:"Środowisko i ochrona",structure:"Obiekty inżynieryjne",geoscientificInformation:"Geologia i geofizyka",health:"Zdrowie i choroby",imageryBaseMapsEarthCover:"Zobrazowania i mapy bazowe",inlandWaters:"Zasoby wodne (wewnątrzlądowe)",location:"Lokalizacje i sieci geodezyjne",intelligenceMilitary:"Wojskowość",oceans:"Oceany i ujścia",transportation:"Sieci transportowe",utilitiesCommunication:"Usługi komunalne i łączność"},multiplicity:{moveElementDown:"Przesuń sekcję w dół",moveElementUp:"Przesuń sekcję w górę",removeElement:"Usuń sekcję",repeatElement:"Powtórz sekcje"},optionalNode:{switchTip:"Uwzględnij lub usuń tę sekcję."},serviceTypes:{featureService:"Usługa obiektowa",mapService:"Usługa mapowa",imageService:"Usługa rastrowa",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} - {message}",patternWithHint:"{label} - {message} {hint}",ok:"OK",empty:"Wymagana jest wartość.",date:"Wartość musi być datą.",integer:"Wartość musi być liczbą całkowitą.",number:"Wartość musi być liczbą.",other:"Nieprawidłowa wartość."},validationPane:{clearMessages:"Usuń komunikaty",prompt:"(kliknij poniższy komunikat i wprowadź wymaganą informację w podanym polu)"}});