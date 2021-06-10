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

define({documentTypes:{arcgis:{caption:"ArcGIS 元数据",editorCaption:"元数据",description:""}},emptyOption:"空",conditionals:{ISO19139A1_ROW4:"如果元数据等级分级为数据集，则需要地理边界框或地理描述。",ISO19139A1_ROW6:"需要数据集标识符或数据集名称。",ISO19139A1_ROW7:"如果选择其他限制，则需要其他约束。",ISO19139A1_ROW9:"如果范围不是数据集或系列，则需要等级描述。",ISO19139A1_ROW10_11_12:"如果范围是数据集或系列；则需要说明、处理步骤或数据源中的一项。",ISO19139A1_ROW15:"如果选择检测点可用性，则需要检测点描述。",ISO19139A1_ROW18:"如果记录分发，则需要格式或分销商/格式。",INSPIRE_AccessLimitation:" 至少需要一个合法访问限制代码或安全性分类代码。(INSPIRE)",INSPIRE_UseLimitation:" 至少需要一个使用限制。(INSPIRE)",INSPIRE_ConformanceResult:"属性域一致性报告需要一致性结果。(INSPIRE)",INSPIRE_DomainConsistency:"需要属性域一致性报告。(INSPIRE)",INSPIRE_LineageStatement:"如果范围是数据集或系列，则需要谱系说明。(INSPIRE)。",FGDC_DescIfTemporal:"时间范围的描述为必填项。(FGDC)",FGDC_Keywords:"主题、标签或专题关键字为必填项。(FGDC)",FGDC_Reports:"需要完整性省略报告和概念一致性报告。(FGDC)",FGDC_Temporal:"至少需要一个时间范围。(FGDC)",NAP_Contact:"需要地址/投递点、电话/语音号码或在线资源/URL。(NAP)",GEN_BoundingBox:"至少需要一个地理边界框。",GEN_ReportResult:"需要一致性结果或定量结果。",minLessThanMax:"最小值必须小于最大值。"},hints:{integerGreaterThanZero:"(请输入一个大于 0 的整数)",integerGreaterThanOne:"(请输入一个大于 1 的整数)",integer0To100:"(请输入一个介于 0 到 100 之间的整数)",maxScale:"(请输入一个大于 0 的整数，如 50000)",minScale:"(请输入一个大于 0 的整数，如 150000000)",number0To100:"(请输入一个介于 0 至 100 之间的数字)",number0To360:"(请输入一个介于 0 至 360 之间的数字)",number90To90:"(请输入一个 -90 至 90 之间的数字 -90..90)",listOfDoubles:"(输入数字列表，使用空格分隔)"},htmlEditor:{button:"编辑..."},sections:{overview:"总览",esri:"Esri",resource:"资源",reference:"引用",content:"内容",distribution:"分发",quality:"质量",eainfo:"字段",representation:"制图表达",metadata:"元数据"},metadataStyle:{caption:"ArcGIS 元数据样式",changeButton:"更改...",dialogTitle:"选择元数据样式",updating:"正在更新文档...","Item Description":"项目描述","FGDC CSDGM Metadata":"FGDC CSDGM 元数据","ISO 19139 Metadata Implementation Specification":"ISO 19139 元数据实施规范","ISO 19139 Metadata Implementation Specification GML3.2":"ISO 19139 元数据实施规范 GML3.2","INSPIRE Metadata Directive":"INSPIRE 元数据指令","North American Profile of ISO19115 2003":"ISO19115 2003 年的北美专用标准"},aggrInfo:{caption:"聚合信息",datasetHint:"需要数据集标识符或数据集名称。",aggrDSIdent:"数据集标识符",aggrDSName:"数据集名称"},appSchInfo:{caption:"应用程序方案",asName:"方案名称",asSchLang:"方案语言",asCstLang:"限制语言",asAscii:"ASCII",asGraFile:"图形文件",asGraFile_src:"图形文件源",asSwDevFile:"软件开发文件",asSwDevFile_src:"软件开发文件源",asSwDevFiFt:"软件开发文件格式"},citation:{caption:"引用信息",section:{titlesAndDates:"标题和日期",links:"URL",identifiers:"标识符",presentation:"形式",other:"其他",edition:"版本",series:"系列"},conditionalDate:{caption:"引用日期",msg:"需要创建日期、发布日期或修订日期之中的一项。",msg_nap:"需要引用日期。"},resTitle:"标题",resAltTitle:"别名",resTitleForInspire:{bg:"Bulgarian (BG): РЕГЛАМЕНТ (ЕС) № 1089/2010  НА КОМИСИЯТА",cs:"Czech (CS): NAŘÍZENÍ KOMISE (EU) č. 1089/2010",da:"Danish (DA): KOMMISSIONENS FORORDNING (EU) Nr. 1089/2010",de:"German (DE): VERORDNUNG (EG) Nr. 1089/2010 DER KOMMISSION",el:"Greek (EL): ΚΑΝΟΝΙΣΜΟΣ (ΕΕ) αριθ. 1089/2010 ΤΗΣ ΕΠΙΤΡΟΠΗΣ",en:"English (EN): COMMISSION REGULATION (EU) No 1089/2010",es:"Spanish (ES): REGLAMENTO (UE) N o 1089/2010 DE LA COMISIÓN",et:"Estonian (ET): KOMISJONI MÄÄRUS (EL) nr 1089/2010",fi:"Finnish (FI): KOMISSION ASETUS (EU) N:o 1089/2010",fr:"French (FR): RÈGLEMENT (UE) No 1089/2010 DE LA COMMISSION",hr:"Croatian (HR): UREDBA KOMISIJE (EU) br. 1089/2010",hu:"Hungarian (HU): A BIZOTTSÁG 1089/2010/EU RENDELETE",it:"Italian (IT): REGOLAMENTO (UE) N. 1089/2010 DELLA COMMISSIONE",lt:"Lithuanian (LT): KOMISIJOS REGLAMENTAS (ES) Nr. 1089/2010",lv:"Latvian (LV): KOMISIJAS REGULA (ES) Nr. 1089/2010",mt:"Maltese (MT): REGOLAMENT TAL-KUMMISSJONI (UE) Nru 1089/2010",nl:"Dutch (NL): VERORDENING (EU) Nr. 1089/2010 VAN DE COMMISSIE",pl:"Polish (PL): ROZPORZĄDZENIE KOMISJI (UE) NR 1089/2010",pt:"Portuguese (PT): REGULAMENTO (UE) N. o 1089/2010 DA COMISSÃO",ro:"Romanian (RO): REGULAMENTUL (UE) NR. 1089/2010 AL COMISIEI",sk:"Slovak (SK): NARIADENIE KOMISIE (EÚ) č. 1089/2010",sl:"Slovenian (SL): UREDBA KOMISIJE (EU) št. 1089/2010",sv:"Swedish (SV): KOMMISSIONENS FÖRORDNING (EU) nr 1089/2010"},collTitle:"总标题",date:{createDate:"创建日期",pubDate:"发布日期",reviseDate:"修订日期",notavailDate:"不可用日期",inforceDate:"有效日期",adoptDate:"采用日期",deprecDate:"弃用日期",supersDate:"废弃日期"},isbn:"国际标准书号",issn:"国际标准期刊号",citId:{caption:"标识符",identCode:"代码",identAuth:"权威引用信息"},resEd:"版本",resEdDate:"版本日期",datasetSeries:{seriesName:"名称",issId:"问题",artPage:"页"},otherCitDet:"其他详细信息",contactCaption:"引用信息联系人"},cntAddress:{caption:"地址",delPoint:"投递点",city:"县",adminArea:"行政区",postCode:"邮政编码",country:"国家/地区",eMailAdd:"电子邮件",addressType:{caption:"地址类型",postal:"邮政地址",physical:"实际地址",both:"两者"}},cntOnlineRes:{caption:"在线资源",linkage:"URL",protocol:"协议",appProfile:"应用程序配置文件",orName:"名称",orDesc:"描述"},cntPhone:{caption:"手机",voiceNum:"语音",faxNum:"传真",tddtty:"TDD/TTY?"},codeRef:{caption:"标识符",identCode:"代码",idCodeSpace:"代码空间",idVersion:"版本",identAuth:"权威引用信息"},constraints:{caption:"约束",useLimit:"使用局限性",general:{caption:"常规"},legal:{caption:"法律声明",accessConsts:"访问限制",useConsts:"使用限制",othConsts:"其他限制"},security:{caption:"安全性",classSys:"分类系统",userNote:"用户注意事项",handDesc:"处理描述"}},contInfo:{caption:"内容信息",section:{CovDesc:"Coverage 描述",ImgDesc:"图像描述",FetCatDesc:"要素目录"},attDesc:"属性描述",covDim:{caption:"范围或波段",seqID:"序列标识符",seqIDType:"序列标识符类型",dimDescrp:"描述符"},RangeDim:{caption:"范围"},Band:{caption:"波段",minVal:"最小值",maxVal:"最大值",valUnit:"值单位",pkResp:"峰值响应",bitsPerVal:"每个值的位数",toneGrad:"色阶",sclFac:"比例因子",offset:"偏移"},CovDesc:{caption:"Coverage 描述",section:{description:"描述",rangesAndBands:"范围和波段"}},ImgDesc:{caption:"图像描述",section:{description:"描述",rangesAndBands:"范围和波段"},illElevAng:"入射高度角",illAziAng:"入射方位角",cloudCovPer:"云覆盖比例",cmpGenQuan:"压缩质量",trianInd:"三角测量指示符?",radCalDatAv:"辐射校正数据可用性?",camCalInAv:"相机检校信息可用性?",filmDistInAv:"胶片畸变信息可用性?",lensDistInAv:"镜头畸变信息可用性?",imagQuCode:"质量代码",prcTypCde:"处理级别编码"},FetCatDesc:{caption:"要素目录",section:{description:"描述",featureTypes:"要素类型",citation:"引用信息"},compCode:"符合 ISO 19110?",incWithDS:"Included With Dataset?",catCitation:"要素目录引用",catFetTyps:{caption:"要素类型",genericName:"名称",codeSpace:"代码空间"}}},contact:{caption:"联系人",section:{name:"联系人姓名",info:"联系人信息",hoursAndInstructions:"时间和说明"},conditionalName:{caption:"联系人姓名",msg:"需要个人姓名、组织名称或职位名称之中的一项。",msg_fgdc:"需要个人姓名或组织名称之中的一项。"},rpIndName:"个人姓名",rpOrgName:"组织名称",rpPosName:"职位名称",rpCntInfo:"联系人信息",cntHours:"服务时间",cntInstr:"联系说明"},distInfo:{caption:"分发信息",section:{format:"格式",distributor:"经销商",transfer:"传输选项"},distFormat:{caption:"分发格式",formatName:"格式名称",formatVer:"格式版本",formatAmdNum:"修订号",formatSpec:"规范",fileDecmTech:"解压缩方法",formatInfo:"信息内容"},distributor:{caption:"经销商"},distTranOps:{caption:"数字传送选项",section:{unitsAndSize:"单位"},unitsODist:"分发单位",transSize:"传送量",offLineMed:{caption:"离线介质",medDensity:"密度",medDenUnits:"密度单位",medVol:"卷",medNote:"介质注释"}},distorOrdPrc:{caption:"订购程序",resFees:"费用",planAvDtTm:"可用日期",planAvTmPd:{caption:"可用日期时段",tmBegin:"开始日期/时间",tmEnd:"结束日期/时间"},ordInstr:"订购说明",ordTurn:"回复"}},dqInfo:{caption:"数据质量",section:{scope:"范围",report:"报告",lineage:"谱系"},dqScope:{section:{level:"级别",extent:"范围"},scpLvl:"范围级别",scpLvlDesc:"级别描述",scpExt:"范围"},report:{section:{measure:"测量",evaluation:"评估",result:"结果",conformance:"一致性"},measDesc:"测量描述",measName:"测量名称",measDateTm:"测量日期",measId:"测量标识符",evalMethDesc:"评估方法",evalProc:"程序引用",ConResult:{caption:"一致性结果",conExpl:"说明",conSpec:"规范",conPass:{caption:"度",_1:"一致",_0:"不一致"}},QuanResult:{caption:"定量结果",quanVal:"值",quanValType:"值类型",quanValUnit:"值单位",errStat:"错误统计"}},dataLineage:{section:{statement:"说明",dataSource:"数据源",prcStep:"处理步骤"},statement:"谱系说明",dataSource:{caption:"数据源",section:{description:"描述",srcRefSys:"参考系统",srcExt:"范围",srcCitatn:"引用信息"},srcDesc:"数据源描述",srcScale:{rfDenom:"比例分母"},srcRefSys:"源参考系统",srcExt:"数据源范围",srcCitatn:"源引用"},prcStep:{caption:"处理步骤",section:{description:"描述",stepProc:"处理者",stepSrc:"数据源"},stepDesc:"过程描述",stepRat:"基本原理",stepDateTm:"处理流程日期",stepProc:"处理者",stepSrc:"数据源"}}},eainfo:{caption:"实体和属性信息",section:{detailed:"详细信息",overview:"总览"},detailed:{caption:"实体和属性详细信息",section:{enttyp:"实体",attr:"属性"},enttyp:{caption:"实体类型",enttypl:"标注",enttypt:"对象",enttypc:"计数",enttypd:"定义",enttypds:"定义源"},attr:{caption:"属性",section:{description:"描述",value:"值",domain:"空间域"},attrlabl:"标注",attalias:"别名",attrdef:"定义",attrdefs:"定义源",attrtype:"类型",attwidth:"宽度",atprecis:"精度",attscale:"小数位数",atindex:"索引",attrvai:{attrva:"值说明",attrvae:"值精度"},attrmfrq:"值测量频率",begdatea:"值的起始日期",enddatea:"值的终止日期",attrdomv:{caption:"空间域",edom:{caption:"枚举",edomv:"值",edomvd:"定义",edomvds:"定义源"},rdom:{caption:"范围",rdommin:"最小值",rdommax:"最大值",rdommean:"平均值",rdomstdv:"标准差",attrunit:"单位",attrmres:"测量分辨率"},codesetd:{caption:"编码集",codesetn:"名称",codesets:"源"},udom:{caption:"不可表示"}}}},overview:{caption:"总览",eaover:"摘要",eadetcit:"引用信息"}},extent:{caption:"范围",section:{description:"描述",geographic:"地理",temporal:"时间",vertical:"垂直对齐"},exDesc:"范围描述",geoEle:{caption:"地理范围",GeoBndBox:{caption:"边界框",esriExtentType:"用于搜索的范围?",exTypeCode:"范围包含资源?",westBL:"西部边界经度",eastBL:"东部边界经度",southBL:"南部边界纬度",northBL:"北部边界纬度"},GeoDesc:{caption:"地理描述",exTypeCode:"描述中包含资源?",identCode:"代码"}},tempEle:{caption:"时间范围",TM_Period:"时间段",TM_Instant:"时间点",tmPosition:"日期",tmBegin:"开始日期",tmEnd:"结束日期"},vertEle:{caption:"垂直范围",vertMinVal:"最小值",vertMaxVal:"最大值"}},graphOver:{caption:"浏览图形",bgFileName:"浏览图形 URL",bgFileDesc:"浏览图形描述",bgFileType:"浏览图形文件类型"},keywords:{caption:"关键字",section:{topicCategory:"主题",searchKeys:"标签",themeKeys:"专题",placeKeys:"地点",tempKeys:"时间",discKeys:"领域",stratKeys:"层级",productKeys:"产品",subTopicCatKeys:"副标题",otherKeys:"其他"},delimited:"关键字",searchKeys:"标签",themeKeys:"专题关键字",placeKeys:"地点关键字",tempKeys:"时间关键字",discKeys:"领域关键字",stratKeys:"层级关键字",productKeys:"产品关键字",subTopicCatKeys:"副标题关键字",otherKeys:"其他关键字",thesaName:"主题词表引用",thesaLang:"主题词表语言",gemet:"查找表"},locales:{caption:"区域设置",locale:"区域设置",resTitle:"标题",idAbs:"摘要"},maintenance:{caption:"维护",section:{frequency:"频率",scope:"范围",note:"注释"},usrDefFreq:"自定义频率",dateNext:"下次更新",maintScp:"更新范围",upScpDesc:{caption:"范围描述",attribSet:"属性",attribIntSet:"属性实例",featSet:"要素",featIntSet:"要素实例",datasetSet:"数据集",other:"其他实例"},maintNote:"维护注释",maintCont:"维护联系人"},metadata:{section:{profile:"配置文件",details:"范围"},mdFileID:"文件标识符",mdParentID:"父标识符",datasetURI:"数据集 URI",dataSetFn:"数据集函数",mdDateSt:"元数据日期",mdTimeSt:"元数据时间",mdLang:"元数据语言",mdChar:"字符集",mdHrLv:"等级分级",mdHrLvName:"等级分级名称",mdContact:"元数据联系人",mdMaint:"元数据维护",mdConst:"元数据限制信息"},porCatInfo:{caption:"描绘引用"},refSysInfo:{caption:"空间参考"},resource:{section:{citation:"引用信息",details:"详细信息",description:"描述",keywords:"关键字",status:"状态",resolution:"分辨率",representation:"表示形式",browse:"浏览图形",format:"格式",usage:"使用情况",aggregateInfo:"聚合",additional:"附加"},idAbs:"描述(摘要)",idPurp:"摘要(用途)",suppInfo:"附加信息",idCredit:"制作者名单",envirDesc:"处理环境",dataLang:"资源语言",dataExt:"资源范围",idPoC:"联系方",resMaint:"资源维护",resConst:"资源限制信息",dsFormat:"资源格式",dataScale:{caption:"数据比例",equScale:"比例分辨率",scaleDist:"距离分辨率",scaleDist_value:"距离"},idSpecUse:{caption:"资源使用情况",specUsage:"特定用法",usageDate:"使用日期",usrDetLim:"限制",usrCntInfo:"使用联系人"}},service:{caption:"服务",svType:"服务类型",svType_Name:"名称",svAccProps:"访问属性",svCouplRes:{caption:"耦合的资源",svOpName:"操作名称",svResCitId:"资源标识符"},svCoupleType:"耦合类型"},scaleRange:{caption:"比例范围",maxScale:"最大比例",minScale:"最小比例"},spatRepInfo:{caption:"空间表示",section:{dimension:"尺寸",parameters:"参数"},numDims:"维数",tranParaAv:"变换参数可用性?",axisDimension:{caption:"尺寸",dimSize:"大小",dimResol:{caption:"分辨率",_value:"分辨率值",uom:"分辨率单位"}},VectSpatRep:{caption:"矢量",geometObjs:"几何对象",geoObjCnt:"对象计数"},GridSpatRep:{caption:"格网"},Georect:{caption:"地理校正",section:{centerPoint:"中心点",cornerPts:"角点"},chkPtAv:"检测点可用性?",chkPtDesc:"检测点描述",ptInPixel:"像素点",transDimDesc:"变换维说明",transDimMap:"变换维映射",cornerPts:{caption:"角点",pos:"位置",gmlDesc:"描述",gmlDescRef:"引用",gmlIdent:"标识符",codeSpace:"标识符代码空间"}},Georef:{caption:"地理可配准性",ctrlPtAv:"控制点可用性?",orieParaAv:"定向参数可用性?",orieParaDs:"方向参数描述",georefPars:"地理配准参数",paraCit:"参数引用"},Indref:{caption:"间接"}},booleanOptions:{_false:"否",_true:"是"},codelist:{CountryCode:"国家/地区",LanguageCode:"语言",MonetaryUnits:"货币单位",MonetaryUnits_empty:"无通用货币",PresentationForm:"FGDC 地理空间数据表示形式",CI_PresentationFormCode:"表示方式",CI_RoleCode:"角色",CI_OnLineFunctionCode:"功能",IMS_ContentType:"内容类型",DQ_ElementDimension:"尺寸",DQ_ElementType:"报表类型",DQ_EvaluationMethodTypeCode:"评估类型",DS_AssociationTypeCode:"关联类型",DS_InitiativeTypeCode:"初始类型",LI_SourceType:"源类型",MD_CellGeometryCode:"单元几何",MD_CharacterSetCode:"字符集",MD_ClassificationCode:"分类",MD_CoverageContentTypeCode:"内容类型",MD_DimensionNameTypeCode:"维度类型",MD_GeometricObjectTypeCode:"几何对象类型",MD_ImagingConditionCode:"成像条件",MD_MaintenanceFrequenceCode:"更新频率",MD_MediumFormatCode:"格式编码",MD_MediumNameCode:"介质名称",MD_PixelOrientationCode:"像素定向",MD_ProgressCode:"状态",MD_RestrictionCode:"限制代码",MD_ScopeCode:"范围",MD_SpatialRepresentationTypeCode:"空间表示类型",MD_TopicCategoryCode:"主题类别",MD_TopologyLevelCode:"拓扑等级",RS_Dimension:"尺寸",SV_CouplingType:"耦合类型",UCUM:"单位",UCUM_Length:"距离单位",RS_UseLimitations:"使用限制",RS_AccessConstraints:"访问限制"}});