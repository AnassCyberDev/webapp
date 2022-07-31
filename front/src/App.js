import {useState,useEffect} from 'react'
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Post from "./components/post/Post";
import All from "./components/propreties/All";
import UserProfileWrapper from "./components/profile/UserProfileWrapper";
import Login from "./components/login/Login";
import About from "./components/about/About";
import PropertyWrapper from './components/property/PropertyWrapper';
import MyPropertiesWrapper from './components/propreties/MyPropertiesWrapper';
import Dashboard from './components/dashboard/Dashboard';
import Pageerror from './components/page_error/Page-error';
import PostmodifyWrapper from './components/postmodify/PostmodifyWrapper';
import FilterPropertiesWrapper from './components/propreties/FilterPropertiesWrapper';
import cookies from 'js-cookie'

// ici le dictionnaire des villes :

const villes={  "ﻋﻴﻦ ﺣﺮﻭﺩﺓ": "Ain_Harrouda",
"بوسكورة": "Bouskoura",
"الدار البيضاء": "Casablanca",
"مديونة": "Mediouna",
"تيط مليل": "Tit_Mellil",
"أبي الجعد": "Bejaad",
"بن احمد": "Ben_Ahmed",
"بن سليمان": "Benslimane",
"بو جنيبة": "Boujniba",
"بو لنوار": "Boulanouare",
"بوزنيقة": "Bouznika",
"الدروة": "Deroua",
"البروج": "El_Borouj",
"الݣارة": "El_Gara",
"ݣيسر": "Guisser",
"حطان": "Hattane",
"خريبكة": "Khouribga",
"الاولاد": "Loulad",
"واد زم": "Oued_Zem",
"اولاد عبو": "Oulad_Abbou",
"اولاد سعيد": "Oulad_Said",
"رأس العين": "Ras_El_Ain",
"سطات": "Settat",
"حد السوالم": "Soualem",
"أزمور": "Azemmour",
"بوݣدرة": "Bouguedra",
"الشماعية": "Echemmaia",
"حرارة": "Hrara",
"اغود": "Ighoud",
"جمعة سحيم": "Jamaat_Shaim",
"الجرف الأصفر": "Jorf_Lasfar",
"العونات": "Laaounate",
"مولاي عبد الله": "Moulay_Abdallah",
"أولاد عمران": "Oulad_Amrane",
"أولاد فرج": "Oulad_Frej",
"اولاد غدبان": "Oulad_Ghadbane",
"أسفي": "Safi",
"سبت المعرف": "Sebt_El_Maarif",
"سبت ݣزولة": "Sebt_Gzoula",
"اليوسفية": "Youssoufia",
"فاس": "Fes",
"عين شݣاݣ": "Ain_Cheggag",
"البهاليل": "Bhalil",
"بولمان": "Boulemane",
"المنزل": "El_Menzel",
"كيكو": "Guigou",
"إيموزار كندر": "Imouzzer_Kandar",
"إموزار مرموشة": "Imouzzer_Marmoucha",
"ميسور": "Missour",
"مولاي يعقوب": "Moulay_Yaacoub",
"اولاد الطيب": "Ouled_Tayeb",
"اوطاط الحاج": "Outat_El_Haj",
"رباط الخير": "Ribate_El_Kheir",
"صفرو": "Sefrou",
"السخينات": "Skhinate",
"تفجيغت": "Tafajight",
"عرباوة": "Arbaoua",
"عين دريج": "Ain_Dorij",
"دار الݣداري": "Dar_Gueddari",
"حد كورت": "Had_Kourt",
"جرف الملحةa": "Jorf_El_Melha",
"القنيطرة": "Kenitra",
"الخنيشات": "Khenichet",
"للا ميمونة": "Lalla_Mimouna",
"مشرع بلقصيري": "Mechra_Bel_Ksiri",
"المهدية": "Mehdia",
"مولاي بو سلهام": "Moulay_Bousselham",
"سوق الاربعاء": "Souk_El_Arbaa",
"أقا": "Akka",
"آس": "Assa",
"بو يزكارن": "Bouizakarne",
"الوطية": "El_Ouatia",
"سمارة": "Es_Semara",
"فم الحصن": "Fam_El_Hisn",
"ݣلميم": "Guelmim",
"تغجيجت": "Taghjijt",
"طانطان": "Tan_Tan",
"طاطا": "Tata",
"الزاك": "Zag",
"مراكش": "Marrakech",
"آيت داود": "Ait_Daoud",
"أمزميز": "Amizmiz",
"السهريج": "Assahrij",
"آيت ورير": "Ait_Ourir",
"ابن جرير": "Ben_Guerir",
"شيشاوة": "Chichaoua",
"الحنشان": "El_Hanchane",
"قلعة السراغنة": "El_Kelaa_des_Sraghna",
"الصويرة": "Essaouira",
"الفرائطة": "Fraita",
"اغمات": "Ghmate",
"اغونان": "Ighounane",
"إيمنتانوت": "Imintanoute",
"القطارة": "Kattara",
"للا تاكركوست": "Lalla_Takerkoust",
"لوداية": "Loudaya",
"العطاوية": "Laattaouia",
"مولاي إبراهيم": "Moulay_Brahim",
"امزوضة": "Mzouda",
"اوناغا": "Ounagha",
"صخور رحمنا": "Skhour_Rehamna",
"سميمو": "Smimou",
"تفتاشت": "Tafetachte",
"تحناوت": "Tahannaout",
"تالمست": "Talmest",
"تاملالت": "Tamallalt",
"تمنار": "Tamanar",
"تامنصورت": "Tamansourt",
"تامصلوحت": "Tameslouht",
"تنالت": "Tanalt",
"مكناس": "Meknes",
"خنيفرة": "Khenifra",
"اݣوراي": "Agourai",
"عين تاوجطات": "Ain_Taoujdate",
"مولاي عالي الشريف": "MyAliCherif",
"الريصاني": "Rissani",
"املو إغربن": "Amalou_Ighriben",
"أوفوس": "Aoufous",
"أرفود": "Arfoud",
"أزرو": "Azrou",
"عين الجمعة": "Ain_Jemaa",
"عين الكرمة": "Ain_Karma",
"عين اللوح": "Ain_Leuh",
"أيت اسحاق": "Ait_Ishaq",
"بودنيب": "Boudnib",
"بوفكران": "Boufakrane",
"بومية": "Boumia",
"الحاجب": "El_Hajeb",
"القباب": "Elkbab",
"الريش": "Er_Rich",
"تنجداد": "Tinejdad",
"كلميمة": "Goulmima",
"ݣرامة": "Gourrama",
"أحد بوحسوسن": "Had_Bouhssoussen",
"الحاج قدور": "El_Haj_Kaddour",
"إيفران": "Ifrane",
"إتزار": "Itzer",
"جرف": "Jorf",
"كهف النسور": "Kehf_Nsour",
"كروشن": "Kerrouchen",
"مولاي بوعزة": "Moulay_Bouazza",
"موساوا": "Oued_Ifrane",
"واد إيفران": "Sabaa_Aiyoun",
"سبع عيون": "Sebt_Jahjouh",
"سبت جحجوح": "Tighassaline",
"تغسالين": "Tighza",
"تمحضيت": "Timahdite",
"تولال": "Toulal",
"تونفيت": "Tounfite",
"زايدة": "Zaida",
"احفير": "Ahfir",
"أكليم": "Aklim",
"العروي": "Al_Aroui",
"عين بني مطهر": "Ain_Bni_Mathar",
"عين الرݣادة": "Ain_Erreggada",
"بن الطيب": "Ben_Taieb",
"بَركان": "Berkane",
"بني نصار": "Bni_Ansar",
"بني شيكر": "Bni_Chiker",
"بني درار": "Bni_Drar",
"بني تادجيت": "Bni_Tadjite",
"بوعنان": "Bouanane",
"بوعرفة": "Bouarfa",
"بوهديلة": "Bouhdila",
"دار الكبداني": "Dar_El_Kebdani",
"دبدو": "Debdou",
"دوار الكانين": "Douar_Kannine",
"الدريوش": "Driouch",
"فرخانة": "Farkhana",
"فݣيݣ": "Figuig",
"احدادن": "Ihddaden",
"جعدار": "Jaadar",
"جرادة": "Jerada",
"قرية أركمان": "Kariat_Arekmane",
"قاسيطا": "Kassita",
"كرونة": "Kerouna",
"لعثامنة": "Laatamna",
"مدّاغ": "Madagh",
"الناظور": "Nador",
"النعيمة": "Naima",
"واد الحيمر": "Oued_Heimer",
"وجدة": "Oujda",
"راس الما": "Ras_El_Ma",
"السعيدية": "Saidia",
"سلوان": "Selouane",
"سيدي سليمان الشراعة": "Sidi_Slimane_Echcharraa",
"نالسينت": "Talsint",
"تاوريرت": "Taourirt",
"تندرارة": "Tendrara",
"تزتوتين": "Tiztoutine",
"تويمة": "Touima",
"تويسيت": "Touissit",
"زايو": "Zaio",
"زغنغن": "Zeghanghane",
"الرباط": "Rabat",
"سلا": "Sale",
"عين العودة": "Ain_El_Aouda",
"الهرهورة": "Harhoura",
"الخميسات": "Khemisset",
"أولماس": "Oulmes",
"الرماني": "Rommani",
"تامسنا": "Tamesna",
"تمارة": "Temara",
"تيفليت": "Tiflet",
"توارݣة": "Touarga",
"أكادير": "Agadir",
"أكدز": "Agdz",
"أكني إزمر": "Agni_Izimmer",
"أيت ملول": "Ait_Melloul",
"ألنيف": "Alnif",
"انزي": "Anzi",
"أولوز": "Aoulouz",
"اورير": "Aourir",
"ارزان": "Arazane",
"أيت باها": "Ait_Baha",
"آيت يعزا": "Ait_Iaaza",
"آيت يالا": "Ait_Yalla",
"يوݣرى": "Biougra",
"بومالن دادس": "Boumalne_Dades",
"الدشيرة الجهادية": "Dcheira_El_Jihadia",
"الدرارݣة": "Drargua",
"الكردان": "El_Guerdane",
"حارة اليمين": "Harte_Lyamine",
"إنزݣان": "Inezgane",
"إغرم": "Irherm",
"لخصاص": "Lakhsas",
"القليعة": "Lqliaa",
"وارزازات": "Ouarzazate",
"اولاد برحيل": "Oulad_Berhil",
"أولاد تايمة": "Oulad_Teima",
"سكورة": "Skoura",
"تافراوت": "Tafraout",
"تاليوين": "Taliouine",
"تامكروت": "Tamegroute",
"تزنيت": "Tiznit",
"زاݣورة": "Zagora",
"افورار": "Afourar",
"أزيلال": "Azilal",
"بني ملال": "Beni_Mellal",
"برادية": "Bradia",
"بزو": "Bzou",
"دمنات": "Demnate",
"القصيبة": "El_Ksiba",
"فم الجمعة": "Foum_Jamaa",
"الفقيه بن صالح": "Fquih_Ben_Salah",
"قصبة تادلة": "Kasba_Tadla",
"واويزغت": "Ouaouizeght",
"زاوية الشيخ": "Zaouiat_Cheikh",
"طنجة": "Tanger",
"تطوان": "Tetouan",
"أصيلة": "Assilah",
"باب برد": "Bab_Berred",
"باب تازة": "Bab_Taza",
"بريكشة": "Brikcha",
"شفشاون": "Chefchaouen",
"دار بن كريش": "Dar_Bni_Karrich",
"دار شاوي": "Dar_Chaoui",
"جبهة": "Jebha",
"خميس سهل": "Khemis_Sahel",
"القصر الكبير": "Ksar_El_Kebir",
"العرائش": "Larache",
"مقريسات": "Moqrisset",
"أجدير": "Ajdir",
"أكنول": "Aknoul",
"الحسيمة": "Al_Hoceima",
"بني بوعياش": "Bni_Bouayach",
"بني حذيفة": "Bni_Hadifa",
"غفساي": "Ghafsai",
"جرسيف": "Guercif",
"إمزورن": "Imzouren",
"قرية با محمد": "Karia_Ba_Mohamed",
"أولاد ازباير": "Oulad_Zbair",
"تاهلا": "Tahla",
"تمسينت": "Tamassint",
"تاونات": "Taounate",
"تارجيست": "Targuist",
"تازة": "Taza",
"تيناست": "Tainaste",
"ظهر السوق": "Thar_Es_Souk",
"تيسة": "Tissa",
"العيون": "Laayoune",
"المرسى": "El_Marsa",
"طرفاية": "Tarfaya",
"بوجدور": "Boujdour",
"Ain Harrouda": "Ain_Harrouda",
"Bouskoura": "Bouskoura",
"Casablanca": "Casablanca",
"Mediouna": "Mediouna",
"Tit Mellil": "Tit_Mellil",
"Bejaad": "Bejaad",
"Ben Ahmed": "Ben_Ahmed",
"Benslimane": "Benslimane",
"Boujniba": "Boujniba",
"Boulanouare": "Boulanouare",
"Bouznika": "Bouznika",
"Deroua": "Deroua",
"El Borouj": "El_Borouj",
"El Gara": "El_Gara",
"Guisser": "Guisser",
"Hattane": "Hattane",
"Khouribga": "Khouribga",
"Loulad": "Loulad",
"Oued Zem": "Oued_Zem",
"Oulad Abbou": "Oulad_Abbou",
"Oulad Said": "Oulad_Said",
"Ras El Ain": "Ras_El_Ain",
"Settat": "Settat",
"Soualem": "Soualem",
"Azemmour": "Azemmour",
"Bouguedra": "Bouguedra",
"Echemmaia": "Echemmaia",
"Hrara": "Hrara",
"Ighoud": "Ighoud",
"Jamaat Shaim": "Jamaat_Shaim",
"Jorf Lasfar": "Jorf_Lasfar",
"Laaounate": "Laaounate",
"Moulay Abdallah": "Moulay_Abdallah",
"Oulad Amrane": "Oulad_Amrane",
"Oulad Frej": "Oulad_Frej",
"Oulad Ghadbane": "Oulad_Ghadbane",
"Safi": "Safi",
"Sebt El Maarif": "Sebt_El_Maarif",
"Sebt Gzoula": "Sebt_Gzoula",
"Youssoufia": "Youssoufia",
"Fes": "Fes",
"Ain Cheggag": "Ain_Cheggag",
"Bhalil": "Bhalil",
"Boulemane": "Boulemane",
"El Menzel": "El_Menzel",
"Guigou": "Guigou",
"Imouzzer Kandar": "Imouzzer_Kandar",
"Imouzzer Marmoucha": "Imouzzer_Marmoucha",
"Missour": "Missour",
"Moulay Yaacoub": "Moulay_Yaacoub",
"Ouled Tayeb": "Ouled_Tayeb",
"Outat El Haj": "Outat_El_Haj",
"Ribate El Kheir": "Ribate_El_Kheir",
"Sefrou": "Sefrou",
"Skhinate": "Skhinate",
"Tafajight": "Tafajight",
"Arbaoua": "Arbaoua",
"Ain Dorij": "Ain_Dorij",
"Dar Gueddari": "Dar_Gueddari",
"Had Kourt": "Had_Kourt",
"Jorf El Melha": "Jorf_El_Melha",
"Kenitra": "Kenitra",
"Khenichet": "Khenichet",
"Lalla Mimouna": "Lalla_Mimouna",
"Mechra Bel Ksiri": "Mechra_Bel_Ksiri",
"Mehdia": "Mehdia",
"Moulay Bousselham": "Moulay_Bousselham",
"Souk El Arbaa": "Souk_El_Arbaa",
"Akka": "Akka",
"Assa": "Assa",
"Bouizakarne": "Bouizakarne",
"El Ouatia": "El_Ouatia",
"Es-Semara": "Es_Semara",
"Fam El Hisn": "Fam_El_Hisn",
"Guelmim": "Guelmim",
"Taghjijt": "Taghjijt",
"Tan-Tan": "Tan_Tan",
"Tata": "Tata",
"Zag": "Zag",
"Marrakech": "Marrakech",
"Ait Daoud": "Ait_Daoud",
"Amizmiz": "Amizmiz",
"Assahrij": "Assahrij",
"Ait Ourir": "Ait_Ourir",
"Ben Guerir": "Ben_Guerir",
"Chichaoua": "Chichaoua",
"El Hanchane": "El_Hanchane",
"El Kelaa des Sraghna": "El_Kelaa_des_Sraghna",
"Essaouira": "Essaouira",
"Fraita": "Fraita",
"Ghmate": "Ghmate",
"Ighounane": "Ighounane",
"Imintanoute": "Imintanoute",
"Kattara": "Kattara",
"Lalla Takerkoust": "Lalla_Takerkoust",
"Loudaya": "Loudaya",
"Laattaouia": "Laattaouia",
"Moulay Brahim": "Moulay_Brahim",
"Mzouda": "Mzouda",
"Ounagha": "Ounagha",
"Skhour Rehamna": "Skhour_Rehamna",
"Smimou": "Smimou",
"Tafetachte": "Tafetachte",
"Tahannaout": "Tahannaout",
"Talmest": "Talmest",
"Tamallalt": "Tamallalt",
"Tamanar": "Tamanar",
"Tamansourt": "Tamansourt",
"Tameslouht": "Tameslouht",
"Tanalt": "Tanalt",
"Meknes": "Meknes",
"Khenifra": "Khenifra",
"Agourai": "Agourai",
"Ain Taoujdate": "Ain_Taoujdate",
"MyAliCherif": "MyAliCherif",
"Rissani": "Rissani",
"Amalou Ighriben": "Amalou_Ighriben",
"Aoufous": "Aoufous",
"Arfoud": "Arfoud",
"Azrou": "Azrou",
"Ain Jemaa": "Ain_Jemaa",
"Ain Karma": "Ain_Karma",
"Ain Leuh": "Ain_Leuh",
"Ait Ishaq": "Ait_Ishaq",
"Boudnib": "Boudnib",
"Boufakrane": "Boufakrane",
"Boumia": "Boumia",
"El Hajeb": "El_Hajeb",
"Elkbab": "Elkbab",
"Er-Rich": "Er_Rich",
"Gardmit": "Gardmit",
"Goulmima": "Goulmima",
"Gourrama": "Gourrama",
"Had Bouhssoussen": "Had_Bouhssoussen",
"El Haj Kaddour": "El_Haj_Kaddour",
"Ifrane": "Ifrane",
"Itzer": "Itzer",
"Jorf": "Jorf",
"Kehf Nsour": "Kehf_Nsour",
"Kerrouchen": "Kerrouchen",
"Moulay Bouazza": "Moulay_Bouazza",
"Oued Ifrane": "Oued_Ifrane",
"Sabaa Aiyoun": "Sabaa_Aiyoun",
"Sebt Jahjouh": "Sebt_Jahjouh",
"Tighassaline": "Tighassaline",
"Tighza": "Tighza",
"Timahdite": "Timahdite",
"Tinejdad": "Tinejdad",
"Toulal": "Toulal",
"Tounfite": "Tounfite",
"Zaida": "Zaida",
"Ahfir": "Ahfir",
"Aklim": "Aklim",
"Al Aroui": "Al_Aroui",
"Ain Bni Mathar": "Ain_Bni_Mathar",
"Ain Erreggada": "Ain_Erreggada",
"Ben Taieb": "Ben_Taieb",
"Berkane": "Berkane",
"Bni Ansar": "Bni_Ansar",
"Bni Chiker": "Bni_Chiker",
"Bni Drar": "Bni_Drar",
"Bni Tadjite": "Bni_Tadjite",
"Bouanane": "Bouanane",
"Bouarfa": "Bouarfa",
"Bouhdila": "Bouhdila",
"Dar El Kebdani": "Dar_El_Kebdani",
"Debdou": "Debdou",
"Douar Kannine": "Douar_Kannine",
"Driouch": "Driouch",
"Farkhana": "Farkhana",
"Figuig": "Figuig",
"Ihddaden": "Ihddaden",
"Jaadar": "Jaadar",
"Jerada": "Jerada",
"Kariat Arekmane": "Kariat_Arekmane",
"Kassita": "Kassita",
"Kerouna": "Kerouna",
"Laatamna": "Laatamna",
"Madagh": "Madagh",
"Nador": "Nador",
"Naima": "Naima",
"Oued Heimer": "Oued_Heimer",
"Oujda": "Oujda",
"Ras El Ma": "Ras_El_Ma",
"Saidia": "Saidia",
"Selouane": "Selouane",
"Sidi Slimane Echcharraa": "Sidi_Slimane_Echcharraa",
"Talsint": "Talsint",
"Taourirt": "Taourirt",
"Tendrara": "Tendrara",
"Tiztoutine": "Tiztoutine",
"Touima": "Touima",
"Touissit": "Touissit",
"Zaio": "Zaio",
"Zeghanghane": "Zeghanghane",
"Rabat": "Rabat",
"Sale": "Sale",
"Ain El Aouda": "Ain_El_Aouda",
"Harhoura": "Harhoura",
"Khemisset": "Khemisset",
"Oulmes": "Oulmes",
"Rommani": "Rommani",
"Tamesna": "Tamesna",
"Temara": "Temara",
"Tiflet": "Tiflet",
"Touarga": "Touarga",
"Agadir": "Agadir",
"Agdz": "Agdz",
"Agni Izimmer": "Agni_Izimmer",
"Ait Melloul": "Ait_Melloul",
"Alnif": "Alnif",
"Anzi": "Anzi",
"Aoulouz": "Aoulouz",
"Aourir": "Aourir",
"Arazane": "Arazane",
"Ait Baha": "Ait_Baha",
"Ait Iaaza": "Ait_Iaaza",
"Ait Yalla": "Ait_Yalla",
"Biougra": "Biougra",
"Boumalne-Dades": "Boumalne_Dades",
"Dcheira El Jihadia": "Dcheira_El_Jihadia",
"Drargua": "Drargua",
"El Guerdane": "El_Guerdane",
"Harte Lyamine": "Harte_Lyamine",
"Inezgane": "Inezgane",
"Irherm": "Irherm",
"Lakhsas": "Lakhsas",
"Lqliaa": "Lqliaa",
"Ouarzazate": "Ouarzazate",
"Oulad Berhil": "Oulad_Berhil",
"Oulad Teima": "Oulad_Teima",
"Skoura": "Skoura",
"Tafraout": "Tafraout",
"Taliouine": "Taliouine",
"Tamegroute": "Tamegroute",
"Tiznit": "Tiznit",
"Zagora": "Zagora",
"Afourar": "Afourar",
"Azilal": "Azilal",
"Beni Mellal": "Beni_Mellal",
"Bradia": "Bradia",
"Bzou": "Bzou",
"Demnate": "Demnate",
"El Ksiba": "El_Ksiba",
"Foum Jamaa": "Foum_Jamaa",
"Fquih Ben Salah": "Fquih_Ben_Salah",
"Kasba Tadla": "Kasba_Tadla",
"Ouaouizeght": "Ouaouizeght",
"Zaouiat Cheikh": "Zaouiat_Cheikh",
"Tanger": "Tanger",
"Tetouan": "Tetouan",
"Assilah": "Assilah",
"Bab Berred": "Bab_Berred",
"Bab Taza": "Bab_Taza",
"Brikcha": "Brikcha",
"Chefchaouen": "Chefchaouen",
"Dar Bni Karrich": "Dar_Bni_Karrich",
"Dar Chaoui": "Dar_Chaoui",
"Jebha": "Jebha",
"Khemis Sahel": "Khemis_Sahel",
"Ksar El Kebir": "Ksar_El_Kebir",
"Larache": "Larache",
"Moqrisset": "Moqrisset",
"Ajdir": "Ajdir",
"Aknoul": "Aknoul",
"Al Hoceima": "Al_Hoceima",
"Bni Bouayach": "Bni_Bouayach",
"Bni Hadifa": "Bni_Hadifa",
"Ghafsai": "Ghafsai",
"Guercif": "Guercif",
"Imzouren": "Imzouren",
"Karia Ba Mohamed": "Karia_Ba_Mohamed",
"Oulad Zbair": "Oulad_Zbair",
"Tahla": "Tahla",
"Tamassint": "Tamassint",
"Taounate": "Taounate",
"Targuist": "Targuist",
"Taza": "Taza",
"Tainaste": "Tainaste",
"Thar Es-Souk": "Thar_Es_Souk",
"Tissa": "Tissa",
"Laayoune": "Laayoune",
"El Marsa": "El_Marsa",
"Tarfaya": "Tarfaya",
"Boujdour": "Boujdour"
}

const villes2={
  "Ain_Harrouda": "Ain Harrouda",
  "Bouskoura": "Bouskoura",
  "Casablanca": "Casablanca",
  "Mediouna": "Mediouna",
  "Tit_Mellil": "Tit Mellil",
  "Bejaad": "Bejaad",
  "Ben_Ahmed": "Ben Ahmed",
  "Benslimane": "Benslimane",
  "Boujniba": "Boujniba",
  "Boulanouare": "Boulanouare",
  "Bouznika": "Bouznika",
  "Deroua": "Deroua",
  "El_Borouj": "El Borouj",
  "El_Gara": "El Gara",
  "Guisser": "Guisser",
  "Hattane": "Hattane",
  "Khouribga": "Khouribga",
  "Loulad": "Loulad",
  "Oued_Zem": "Oued Zem",
  "Oulad_Abbou": "Oulad Abbou",
  "Oulad_Said": "Oulad Said",
  "Ras_El_Ain": "Ras El Ain",
  "Settat": "Settat",
  "Soualem": "Soualem",
  "Azemmour": "Azemmour",
  "Bouguedra": "Bouguedra",
  "Echemmaia": "Echemmaia",
  "Hrara": "Hrara",
  "Ighoud": "Ighoud",
  "Jamaat_Shaim": "Jamaat Shaim",
  "Jorf_Lasfar": "Jorf Lasfar",
  "Laaounate": "Laaounate",
  "Moulay_Abdallah": "Moulay Abdallah",
  "Oulad_Amrane": "Oulad Amrane",
  "Oulad_Frej": "Oulad Frej",
  "Oulad_Ghadbane": "Oulad Ghadbane",
  "Safi": "Safi",
  "Sebt_El_Maarif": "Sebt El Maarif",
  "Sebt_Gzoula": "Sebt Gzoula",
  "Youssoufia": "Youssoufia",
  "Fes": "Fes",
  "Ain_Cheggag": "Ain Cheggag",
  "Bhalil": "Bhalil",
  "Boulemane": "Boulemane",
  "El_Menzel": "El Menzel",
  "Guigou": "Guigou",
  "Imouzzer_Kandar": "Imouzzer Kandar",
  "Imouzzer_Marmoucha": "Imouzzer Marmoucha",
  "Missour": "Missour",
  "Moulay_Yaacoub": "Moulay Yaacoub",
  "Ouled_Tayeb": "Ouled Tayeb",
  "Outat_El_Haj": "Outat El Haj",
  "Ribate_El_Kheir": "Ribate El Kheir",
  "Sefrou": "Sefrou",
  "Skhinate": "Skhinate",
  "Tafajight": "Tafajight",
  "Arbaoua": "Arbaoua",
  "Ain_Dorij": "Ain Dorij",
  "Dar_Gueddari": "Dar Gueddari",
  "Had_Kourt": "Had Kourt",
  "Jorf_El_Melha": "Jorf El Melha",
  "Kenitra": "Kenitra",
  "Khenichet": "Khenichet",
  "Lalla_Mimouna": "Lalla Mimouna",
  "Mechra_Bel_Ksiri": "Mechra Bel Ksiri",
  "Mehdia": "Mehdia",
  "Moulay_Bousselham": "Moulay Bousselham",
  "Souk_El_Arbaa": "Souk El Arbaa",
  "Akka": "Akka",
  "Assa": "Assa",
  "Bouizakarne": "Bouizakarne",
  "El_Ouatia": "El Ouatia",
  "Es_Semara": "Es-Semara",
  "Fam_El_Hisn": "Fam El Hisn",
  "Guelmim": "Guelmim",
  "Taghjijt": "Taghjijt",
  "Tan_Tan": "Tan-Tan",
  "Tata": "Tata",
  "Zag": "Zag",
  "Marrakech": "Marrakech",
  "Ait_Daoud": "Ait Daoud",
  "Amizmiz": "Amizmiz",
  "Assahrij": "Assahrij",
  "Ait_Ourir": "Ait Ourir",
  "Ben_Guerir": "Ben Guerir",
  "Chichaoua": "Chichaoua",
  "El_Hanchane": "El Hanchane",
  "El_Kelaa_des_Sraghna": "El Kelaa des Sraghna",
  "Essaouira": "Essaouira",
  "Fraita": "Fraita",
  "Ghmate": "Ghmate",
  "Ighounane": "Ighounane",
  "Imintanoute": "Imintanoute",
  "Kattara": "Kattara",
  "Lalla_Takerkoust": "Lalla Takerkoust",
  "Loudaya": "Loudaya",
  "Laattaouia": "Laattaouia",
  "Moulay_Brahim": "Moulay Brahim",
  "Mzouda": "Mzouda",
  "Ounagha": "Ounagha",
  "Skhour_Rehamna": "Skhour Rehamna",
  "Smimou": "Smimou",
  "Tafetachte": "Tafetachte",
  "Tahannaout": "Tahannaout",
  "Talmest": "Talmest",
  "Tamallalt": "Tamallalt",
  "Tamanar": "Tamanar",
  "Tamansourt": "Tamansourt",
  "Tameslouht": "Tameslouht",
  "Tanalt": "Tanalt",
  "Meknes": "Meknes",
  "Khenifra": "Khenifra",
  "Agourai": "Agourai",
  "Ain_Taoujdate": "Ain Taoujdate",
  "MyAliCherif": "MyAliCherif",
  "Rissani": "Rissani",
  "Amalou_Ighriben": "Amalou Ighriben",
  "Aoufous": "Aoufous",
  "Arfoud": "Arfoud",
  "Azrou": "Azrou",
  "Ain_Jemaa": "Ain Jemaa",
  "Ain_Karma": "Ain Karma",
  "Ain_Leuh": "Ain Leuh",
  "Ait_Ishaq": "Ait Ishaq",
  "Boudnib": "Boudnib",
  "Boufakrane": "Boufakrane",
  "Boumia": "Boumia",
  "El_Hajeb": "El Hajeb",
  "Elkbab": "Elkbab",
  "Er_Rich": "Er-Rich",
  "Gardmit": "Gardmit",
  "Goulmima": "Goulmima",
  "Gourrama": "Gourrama",
  "Had_Bouhssoussen": "Had Bouhssoussen",
  "El_Haj_Kaddour": "El Haj Kaddour",
  "Ifrane": "Ifrane",
  "Itzer": "Itzer",
  "Jorf": "Jorf",
  "Kehf_Nsour": "Kehf Nsour",
  "Kerrouchen": "Kerrouchen",
  "Moulay_Bouazza": "Moulay Bouazza",
  "Oued_Ifrane": "Oued Ifrane",
  "Sabaa_Aiyoun": "Sabaa Aiyoun",
  "Sebt_Jahjouh": "Sebt Jahjouh",
  "Tighassaline": "Tighassaline",
  "Tighza": "Tighza",
  "Timahdite": "Timahdite",
  "Tinejdad": "Tinejdad",
  "Toulal": "Toulal",
  "Tounfite": "Tounfite",
  "Zaida": "Zaida",
  "Ahfir": "Ahfir",
  "Aklim": "Aklim",
  "Al_Aroui": "Al Aroui",
  "Ain_Bni_Mathar": "Ain Bni Mathar",
  "Ain_Erreggada": "Ain Erreggada",
  "Ben_Taieb": "Ben Taieb",
  "Berkane": "Berkane",
  "Bni_Ansar": "Bni Ansar",
  "Bni_Chiker": "Bni Chiker",
  "Bni_Drar": "Bni Drar",
  "Bni_Tadjite": "Bni Tadjite",
  "Bouanane": "Bouanane",
  "Bouarfa": "Bouarfa",
  "Bouhdila": "Bouhdila",
  "Dar_El_Kebdani": "Dar El Kebdani",
  "Debdou": "Debdou",
  "Douar_Kannine": "Douar Kannine",
  "Driouch": "Driouch",
  "Farkhana": "Farkhana",
  "Figuig": "Figuig",
  "Ihddaden": "Ihddaden",
  "Jaadar": "Jaadar",
  "Jerada": "Jerada",
  "Kariat_Arekmane": "Kariat Arekmane",
  "Kassita": "Kassita",
  "Kerouna": "Kerouna",
  "Laatamna": "Laatamna",
  "Madagh": "Madagh",
  "Nador": "Nador",
  "Naima": "Naima",
  "Oued_Heimer": "Oued Heimer",
  "Oujda": "Oujda",
  "Ras_El_Ma": "Ras El Ma",
  "Saidia": "Saidia",
  "Selouane": "Selouane",
  "Sidi_Slimane_Echcharraa": "Sidi Slimane Echcharraa",
  "Talsint": "Talsint",
  "Taourirt": "Taourirt",
  "Tendrara": "Tendrara",
  "Tiztoutine": "Tiztoutine",
  "Touima": "Touima",
  "Touissit": "Touissit",
  "Zaio": "Zaio",
  "Zeghanghane": "Zeghanghane",
  "Rabat": "Rabat",
  "Sale": "Sale",
  "Ain_El_Aouda": "Ain El Aouda",
  "Harhoura": "Harhoura",
  "Khemisset": "Khemisset",
  "Oulmes": "Oulmes",
  "Rommani": "Rommani",
  "Tamesna": "Tamesna",
  "Temara": "Temara",
  "Tiflet": "Tiflet",
  "Touarga": "Touarga",
  "Agadir": "Agadir",
  "Agdz": "Agdz",
  "Agni_Izimmer": "Agni Izimmer",
  "Ait_Melloul": "Ait Melloul",
  "Alnif": "Alnif",
  "Anzi": "Anzi",
  "Aoulouz": "Aoulouz",
  "Aourir": "Aourir",
  "Arazane": "Arazane",
  "Ait_Baha": "Ait Baha",
  "Ait_Iaaza": "Ait Iaaza",
  "Ait_Yalla": "Ait Yalla",
  "Biougra": "Biougra",
  "Boumalne_Dades": "Boumalne-Dades",
  "Dcheira_El_Jihadia": "Dcheira El Jihadia",
  "Drargua": "Drargua",
  "El_Guerdane": "El Guerdane",
  "Harte_Lyamine": "Harte Lyamine",
  "Inezgane": "Inezgane",
  "Irherm": "Irherm",
  "Lakhsas": "Lakhsas",
  "Lqliaa": "Lqliaa",
  "Ouarzazate": "Ouarzazate",
  "Oulad_Berhil": "Oulad Berhil",
  "Oulad_Teima": "Oulad Teima",
  "Skoura": "Skoura",
  "Tafraout": "Tafraout",
  "Taliouine": "Taliouine",
  "Tamegroute": "Tamegroute",
  "Tiznit": "Tiznit",
  "Zagora": "Zagora",
  "Afourar": "Afourar",
  "Azilal": "Azilal",
  "Beni_Mellal": "Beni Mellal",
  "Bradia": "Bradia",
  "Bzou": "Bzou",
  "Demnate": "Demnate",
  "El_Ksiba": "El Ksiba",
  "Foum_Jamaa": "Foum Jamaa",
  "Fquih_Ben_Salah": "Fquih Ben Salah",
  "Kasba_Tadla": "Kasba Tadla",
  "Ouaouizeght": "Ouaouizeght",
  "Zaouiat_Cheikh": "Zaouiat Cheikh",
  "Tanger": "Tanger",
  "Tetouan": "Tetouan",
  "Assilah": "Assilah",
  "Bab_Berred": "Bab Berred",
  "Bab_Taza": "Bab Taza",
  "Brikcha": "Brikcha",
  "Chefchaouen": "Chefchaouen",
  "Dar_Bni_Karrich": "Dar Bni Karrich",
  "Dar_Chaoui": "Dar Chaoui",
  "Jebha": "Jebha",
  "Khemis_Sahel": "Khemis Sahel",
  "Ksar_El_Kebir": "Ksar El Kebir",
  "Larache": "Larache",
  "Moqrisset": "Moqrisset",
  "Ajdir": "Ajdir",
  "Aknoul": "Aknoul",
  "Al_Hoceima": "Al Hoceima",
  "Bni_Bouayach": "Bni Bouayach",
  "Bni_Hadifa": "Bni Hadifa",
  "Ghafsai": "Ghafsai",
  "Guercif": "Guercif",
  "Imzouren": "Imzouren",
  "Karia_Ba_Mohamed": "Karia Ba Mohamed",
  "Oulad_Zbair": "Oulad Zbair",
  "Tahla": "Tahla",
  "Tamassint": "Tamassint",
  "Taounate": "Taounate",
  "Targuist": "Targuist",
  "Taza": "Taza",
  "Tainaste": "Tainaste",
  "Thar_Es_Souk": "Thar Es-Souk",
  "Tissa": "Tissa",
  "Laayoune": "Laayoune",
  "El_Marsa": "El Marsa",
  "Tarfaya": "Tarfaya",
  "Boujdour": "Boujdour"
}

// fi n des villes

const languages = [
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
]





export default function App() {
  const currentLAnguageCode= cookies.get('i18next') || 'en'
  const currentLanguage =languages.find(l => l.code === currentLAnguageCode)
  const [fname,setFname] = useState('')
  const [userId,setUserId]=useState(0)
  const [is_admin,setIs_admin]=useState(false)
  
  //=========================> useeffect not set yet =========> to be set to check if user is logged in
  useEffect(()=>{
    const checking=async()=>{
      const resultat= await checkUser()
      console.log(resultat)
      if(resultat.name === 'Admin'){
        setIs_admin(true)
      }else{setIs_admin(false)}
     
     
      

      // if(resultat.resp ==='yes'){
      //   setFname(resultat.name);
      //   setLogged(true)
      //   console.log('am I logged in', fname ,logged)
        
      // }else{
      //   setLogged(false)
      //   console.log('am I logged in',logged)
      // }
    }
    
    checking() // ne pas oublier le backend
},[currentLanguage])



const checkUser=async()=>{
  const response= await fetch('/checking')
  const  resp = await response.json()
  switch(resp.resp){
    case 'yes Admin':
      setFname(resp.name);
      setIs_admin(true);
      setUserId(resp.id)
      console.log('am I logged in as Admin' )
      console.log(is_admin)
      break
    case 'yes':
      setFname(resp.name);
      setUserId(resp.id)
      console.log('am I logged in', fname);
      break
    case 'no':
      setFname('');
      console.log('am I not logged in');
      break
  }
  return resp
} // resp can be {'resp': 'yes Admin', 'name': 'Admin',} or {'resp': 'yes', 'name': username} or {'resp': 'no'}


  return (

     
    <div className="App">
     <Header logged={fname} is_admin={is_admin} userId={userId} languages={languages}/> 
      <BrowserRouter>
      <Routes>
        <Route index element={<Home paralog={fname} villes={villes} villes2={villes2}/>}/> 
        <Route path="/about" element={<About />} /> 
        <Route path={"/profile/:id"} element={<UserProfileWrapper />} /> 
        <Route path="/proprety" element={<Post logged={fname} villes={villes} villes2={villes2}/>} /> 
        <Route path="/dashboard" element={fname?<Dashboard />:<Pageerror />} /> 
        <Route path="/propreties" element={<All />} />
        <Route path="/error" element={<Pageerror />} /> 
        <Route path='/property/:id' element={<PropertyWrapper />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/mesbiens/:id' element={<MyPropertiesWrapper />}/>
        <Route path='/modifyPost/:id' element={<PostmodifyWrapper villes={villes} villes2={villes2}/>}/>
        <Route path='/find/:city/:type/:nature' element={<FilterPropertiesWrapper />}/>
      </Routes>
      </BrowserRouter>
      

  
        
       
    
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);