import React from 'react';

export default function AirportsSelected() {
  const Airports = [
    { country: 'Germany', name: 'Aachen', id: 'AAHA' },
    { country: 'Ivory Coast', name: 'Abidjan', id: 'ABJA' },
    { country: 'United Arab Emirates', name: 'Abu Dhabi', id: 'AUHA' },
    { country: 'Nigeria', name: 'Abuja', id: 'ABVA' },
    { country: 'Mexico', name: 'Acapulco', id: 'ACAA' },
    { country: 'Ghana', name: 'Accra', id: 'ACCA' },
    { country: 'Turkey', name: 'Adana', id: 'ADAN' },
    { country: 'Ethiopia', name: 'Addis Ababa', id: 'ADDA' },
    { country: 'Australia', name: 'Adelaide', id: 'ADLA' },
    { country: 'Morocco', name: 'Agadir', id: 'AGAD' },
    { country: 'India', name: 'Agra', id: 'IAGR' },
    { country: 'Syria', name: 'Aleppo', id: 'ALPA' },
    { country: 'Egypt', name: 'Alexandria', id: 'ALEX' },
    { country: 'Algeria', name: 'Algiers', id: 'ALGA' },
    { country: 'Jordan', name: 'Amman', id: 'AMMA' },
    { country: 'Netherlands', name: 'Amsterdam', id: 'AMST' },
    { country: 'Andorra', name: 'Andorra La Vella', id: 'ALVA' },
    { country: 'Turkey', name: 'Ankara', id: 'ANKA' },
    { country: 'Turkey', name: 'Antalya', id: 'ANTA' },
    { country: 'Madagascar', name: 'Antananarivo', id: 'TNRA' },
    { country: 'Belgium', name: 'Antwerp', id: 'ANTW' },
    { country: 'Samoa', name: 'Apia', id: 'APWW' },
    { country: 'Turkmenistan', name: 'Ashgabat', id: 'ASBA' },
    { country: 'Eritrea', name: 'Asmara', id: 'ASMA' },
    { country: 'Paraguay', name: 'Asuncion', id: 'ASUA' },
    { country: 'Greece', name: 'Athens', id: 'ATHE' },
    { country: 'United States', name: 'Atlanta', id: 'ATLA' },
    { country: 'United States', name: 'Atlantic', id: 'AIOA' },
    { country: 'United States', name: 'Atlantic City', id: 'AIYA' },
    { country: 'New Zealand', name: 'Auckland', id: 'AKLN' },
    { country: 'United States', name: 'Austin', id: 'AUSA' },
    { country: 'France', name: 'Avignon', id: 'AVIG' },
    { country: 'Iraq', name: 'Baghdad', id: 'BGWA' },
    { country: 'Azerbaijan', name: 'Baku', id: 'BAKA' },
    { country: 'Mali', name: 'Bamako', id: 'BKOA' },
    { country: 'Brunei', name: 'Bandar Seri Begawan', id: 'BWNA' },
    { country: 'Indonesia', name: 'Bandung', id: 'BDOI' },
    { country: 'Thailand', name: 'Bangkok', id: 'BKKT' },
    { country: 'Antigua and Barbuda', name: 'Barbuda', id: 'BBQA' },
    { country: 'Spain', name: 'Barcelona', id: 'BARC' },
    { country: 'Colombia', name: 'Barranquilla', id: 'BAQA' },
    { country: 'Georgia', name: 'Batumi', id: 'BUSA' },
    { country: 'China', name: 'Beijing', id: 'BJSA' },
    { country: 'Lebanon', name: 'Beirut', id: 'BEIR' },
    { country: 'United Kingdom', name: 'Belfast', id: 'BELF' },
    { country: 'Serbia', name: 'Belgrade', id: 'BELI' },
    { country: 'Brazil', name: 'Belo Horizonte', id: 'BHZA' },
    { country: 'India', name: 'Bengaluru', id: 'IBLR' },
    { country: 'Libya', name: 'Benghazi', id: 'BENA' },
    { country: 'Norway', name: 'Bergen', id: 'BERI' },
    { country: 'Germany', name: 'Berlin', id: 'BERL' },
    { country: 'Switzerland', name: 'Bern', id: 'BERN' },
    { country: 'Spain', name: 'Bilbao', id: 'BILB' },
    { country: 'United Kingdom', name: 'Birmingham', id: 'BIRM' },
    { country: 'South Africa', name: 'Bloemfontein', id: 'BFNA' },

    { country: 'Colombia', name: 'Bogota', id: 'BOGA' },

    { country: 'Italy', name: 'Bologna', id: 'BOLO' },

    { country: 'France', name: 'Bordeaux', id: 'BORD' },

    { country: 'United States', name: 'Boston', id: 'BOSA' },

    { country: 'Brazil', name: 'Brasilia', id: 'BSBA' },
    { country: 'Slovakia', name: 'Bratislava', id: 'BRAS' },

    { country: 'Republic of the Congo', name: 'Brazzaville', id: 'BZVA' },

    { country: 'Germany', name: 'Bremen', id: 'BREM' },

    { country: 'United Kingdom', name: 'Bristol', id: 'BRIS' },
    { country: 'Czechia', name: 'Brno', id: 'BRNO' },

    { country: 'Belgium', name: 'Brussels', id: 'BRUS' },

    { country: 'Romania', name: 'Bucharest', id: 'BUCH' },
    { country: 'Hungary', name: 'Budapest', id: 'BUDA' },
    { country: 'Argentina', name: 'Buenos Aires', id: 'BUEA' },

    { country: 'Uzbekistan', name: 'Bukhara', id: 'BHKA' },

    { country: 'Turkey', name: 'Bursa', id: 'YEIA' },
    { country: 'South Korea', name: 'Busan', id: 'PUSA' },

    { country: 'France', name: 'Caen', id: 'CAEN' },

    { country: 'Egypt', name: 'Cairo', id: 'CAIR' },

    { country: 'Canada', name: 'Calgary', id: 'YYCA' },
    { country: 'Colombia', name: 'Cali', id: 'CLOA' },

    { country: 'United Kingdom', name: 'Cambridge', id: 'CBGA' },

    { country: 'Australia', name: 'Canberra', id: 'CBRA' },
    { country: 'Mexico', name: 'Cancun', id: 'CUNA' },

    { country: 'Australia', name: 'Canterbury', id: 'WANA' },

    { country: 'South Africa', name: 'Cape Town', id: 'CPTA' },

    { country: 'Venezuela', name: 'Caracas', id: 'CCSA' },

    { country: 'France', name: 'Carcassonne', id: 'CARC' },
    { country: 'United Kingdom', name: 'Cardiff', id: 'CARD' },

    { country: 'Colombia', name: 'Cartagena', id: 'CTGA' },

    { country: 'Morocco', name: 'Casablanca', id: 'CASA' },

    { country: 'Italy', name: 'Catania', id: 'CATA' },

    { country: 'United States', name: 'Charlotte', id: 'CLTA' },
    { country: 'United States', name: 'Charlottesville', id: 'CHOA' },

    { country: 'China', name: 'Chengdu', id: 'CCTU' },
    { country: 'India', name: 'Chennai', id: 'IMAA' },

    { country: 'Thailand', name: 'Chiang Mai', id: 'CNXT' },

    { country: 'United States', name: 'Chicago', id: 'CHIA' },

    { country: 'Bangladesh', name: 'Chittagong', id: 'CGPA' },

    { country: 'China', name: 'Chongqing', id: 'CCKG' },
    { country: 'New Zealand', name: 'Christchurch', id: 'CHCN' },

    { country: 'Romania', name: 'Cluj-Napoca', id: 'CLUJ' },
    { country: 'Germany', name: 'Cologne', id: 'COLO' },
    { country: 'Sri Lanka', name: 'Colombo', id: 'CMBA' },

    { country: 'Denmark', name: 'Copenhagen', id: 'COPE' },

    { country: 'Argentina', name: 'Cordoba', id: 'CORA' },
    { country: 'Spain', name: 'Cordoba', id: 'CORD' },
    { country: 'Greece', name: 'Corfu', id: 'CORF' },
    { country: 'United States', name: 'Corinth', id: 'CRXA' },
    { country: 'Ireland', name: 'Cork', id: 'CORK' },

    { country: 'Romania', name: 'Craiova', id: 'CRAI' },

    { country: 'Brazil', name: 'Curitiba', id: 'CWBA' },

    { country: 'Peru', name: 'Cuzco', id: 'CUZA' },

    { country: 'Vietnam', name: 'Da Nang', id: 'DADV' },
    { country: 'South Korea', name: 'Daegu', id: 'TAEA' },
    { country: 'Senegal', name: 'Dakar', id: 'DKRA' },

    { country: 'China', name: 'Dalian', id: 'CDLC' },
    { country: 'United States', name: 'Dallas', id: 'DFWA' },

    { country: 'Syria', name: 'Damascus', id: 'DAMA' },

    { country: 'Indonesia', name: 'Denpasar', id: 'DPSI' },
    { country: 'United States', name: 'Denver', id: 'DENA' },

    { country: 'United States', name: 'Detroit', id: 'DTTA' },

    { country: 'Bangladesh', name: 'Dhaka', id: 'DACA' },

    { country: 'Tanzania', name: 'Dodoma', id: 'DODA' },
    { country: 'Qatar', name: 'Doha', id: 'DOHA' },

    { country: 'Cameroon', name: 'Douala', id: 'DLAA' },

    { country: 'United Arab Emirates', name: 'Dubai', id: 'DXBA' },
    { country: 'Ireland', name: 'Dublin', id: 'DUBL' },
    { country: 'Croatia', name: 'Dubrovnik', id: 'DUBR' },

    { country: 'South Africa', name: 'Durban', id: 'DURA' },

    { country: 'United Kingdom', name: 'Edinburgh', id: 'EDIN' },

    { country: 'Israel', name: 'Eilat', id: 'ELAT' },
    { country: 'Netherlands', name: 'Eindhoven', id: 'EIND' },

    { country: 'Pakistan', name: 'Faisalabad', id: 'LYPA' },

    { country: 'Portugal', name: 'Faro', id: 'FARO' },

    { country: 'Morocco', name: 'Fes', id: 'FEZS' },

    { country: 'Italy', name: 'Florence', id: 'FLOR' },

    { country: 'Brazil', name: 'Fortaleza', id: 'FORA' },

    { country: 'Germany', name: 'Frankfurt', id: 'FRAN' },

    { country: 'Japan', name: 'Fukuoka', id: 'JFUK' },

    { country: 'China', name: 'Fuzhou', id: 'CFOC' },
    { country: 'Botswana', name: 'Gaborone', id: 'GBEA' },

    { country: 'Ireland', name: 'Galway', id: 'GALW' },

    { country: 'Turkey', name: 'Gaziantep', id: 'GAZI' },
    { country: 'Poland', name: 'Gdansk', id: 'GADA' },

    { country: 'Switzerland', name: 'Geneva', id: 'GENE' },
    { country: 'Italy', name: 'Genoa', id: 'GENO' },

    { country: 'Belgium', name: 'Ghent', id: 'GHEN' },

    { country: 'Gibraltar', name: 'Gibraltar', id: 'GIBR' },

    { country: 'Egypt', name: 'Giza', id: 'SPXE' },

    { country: 'United Kingdom', name: 'Glasgow', id: 'GLAS' },

    { country: 'Australia', name: 'Gold Coast', id: 'OOLA' },

    { country: 'Sweden', name: 'Gothenburg', id: 'GOTH' },

    { country: 'Spain', name: 'Granada', id: 'GRAO' },

    { country: 'Austria', name: 'Graz', id: 'GRAZ' },

    { country: 'Mexico', name: 'Guadalajara', id: 'GDLA' },

    { country: 'Ecuador', name: 'Guayaquil', id: 'GYEA' },

    { country: 'South Korea', name: 'Gwangju', id: 'KWJA' },

    { country: 'Israel', name: 'Haifa', id: 'HAIF' },

    { country: 'Germany', name: 'Hamburg', id: 'HAMB' },

    { country: 'China', name: 'Hangzhou', id: 'CHGH' },

    { country: 'Vietnam', name: 'Hanoi', id: 'HANV' },

    { country: 'Zimbabwe', name: 'Harare', id: 'HREA' },
    { country: 'China', name: 'Harbin', id: 'CHRB' },

    { country: 'Cuba', name: 'Havana', id: 'HAVA' },

    { country: 'Finland', name: 'Helsinki', id: 'HELS' },

    { country: 'Japan', name: 'Hiroshima', id: 'JHIJ' },

    { country: 'Vietnam', name: 'Ho Chi Minh City', id: 'SGNV' },

    { country: 'Hong Kong', name: 'Hong Kong', id: 'HKGA' },

    { country: 'United States', name: 'Honolulu', id: 'HNLA' },

    { country: 'United States', name: 'Houston', id: 'HOUA' },

    { country: 'Egypt', name: 'Hurghada', id: 'HURG' },

    { country: 'India', name: 'Hyderabad', id: 'IHYD' },
    { country: 'Romania', name: 'Iasi', id: 'IASI' },
    { country: 'Nigeria', name: 'Ibadan', id: 'IBAA' },

    { country: 'South Korea', name: 'Incheon', id: 'JCNA' },

    { country: 'Austria', name: 'Innsbruck', id: 'INNS' },

    { country: 'United Kingdom', name: 'Inverness', id: 'INVE' },

    { country: 'Pakistan', name: 'Islamabad', id: 'ISBA' },

    { country: 'Turkey', name: 'Istanbul', id: 'ISTA' },

    { country: 'Turkey', name: 'Izmir', id: 'IZMI' },

    { country: 'India', name: 'Jaipur', id: 'IJAI' },
    { country: 'Indonesia', name: 'Jakarta', id: 'CGKI' },

    { country: 'Saudi Arabia', name: 'Jeddah', id: 'JEDA' },

    { country: 'Israel', name: 'Jerusalem', id: 'JERU' },

    { country: 'South Africa', name: 'Johannesburg', id: 'JNBA' },

    { country: 'Nigeria', name: 'Kano', id: 'KANA' },

    { country: 'Taiwan', name: 'Kaohsiung', id: 'KHHT' },

    { country: 'Pakistan', name: 'Karachi', id: 'KHIA' },

    { country: 'Nepal', name: 'Kathmandu', id: 'KTMA' },

    { country: 'Poland', name: 'Katowice', id: 'KATO' },

    { country: 'Lithuania', name: 'Kaunas', id: 'KAUN' },

    { country: 'Russia', name: 'Kazan', id: 'KAZA' },

    { country: 'Ukraine', name: 'Kharkiv', id: 'KHAR' },
    { country: 'Sudan', name: 'Khartoum', id: 'KRTA' },

    { country: 'Germany', name: 'Kiel', id: 'KIEL' },

    { country: 'India', name: 'Kolkata', id: 'ICCU' },
    { country: 'Slovakia', name: 'Kosice', id: 'KOSI' },

    { country: 'Poland', name: 'Krakow', id: 'KRAK' },

    { country: 'Russia', name: 'Krasnodar', id: 'KRAT' },

    { country: 'Malaysia', name: 'Kuala Lumpur', id: 'KULM' },

    { country: 'Ghana', name: 'Kumasi', id: 'KMSA' },

    { country: 'Kuwait', name: 'Kuwait', id: 'KWIA' },

    { country: 'Japan', name: 'Kyoto', id: 'JUKY' },

    { country: 'Bolivia', name: 'La Paz', id: 'LPBA' },
    { country: 'Mexico', name: 'La Paz', id: 'LAPB' },

    { country: 'Dominican Republic', name: 'La Romana', id: 'LRMA' },

    { country: 'Nigeria', name: 'Lagos', id: 'LOSA' },

    { country: 'Pakistan', name: 'Lahore', id: 'LHEA' },

    { country: 'Malaysia', name: 'Langkawi', id: 'LGKM' },

    { country: 'United States', name: 'Las Vegas', id: 'LASA' },
    { country: 'United States', name: 'Las Vegas', id: 'LVSA' },

    { country: 'United Kingdom', name: 'Leeds', id: 'LEED' },

    { country: 'China', name: 'Lhasa', id: 'CLXA' },

    { country: 'Gabon', name: 'Libreville', id: 'LBVA' },

    { country: 'France', name: 'Lille', id: 'LILL' },

    { country: 'Peru', name: 'Lima', id: 'LIMA' },

    { country: 'Austria', name: 'Linz', id: 'LINZ' },

    { country: 'Portugal', name: 'Lisbon', id: 'LISB' },

    { country: 'United Kingdom', name: 'Liverpool', id: 'LIVE' },

    { country: 'Slovenia', name: 'Ljubljana', id: 'LJUB' },

    { country: 'Poland', name: 'Lodz', id: 'LODZ' },

    { country: 'United Kingdom', name: 'London', id: 'LOND' },

    { country: 'United States', name: 'Los Angeles', id: 'LAXA' },

    { country: 'Angola', name: 'Luanda', id: 'LADA' },

    { country: 'Poland', name: 'Lublin', id: 'CLUZ' },
    { country: 'DR Congo', name: 'Lubumbashi', id: 'FBMA' },

    { country: 'India', name: 'Lucknow', id: 'ILKO' },

    { country: 'Zambia', name: 'Lusaka', id: 'LUNA' },

    { country: 'Luxembourg', name: 'Luxembourg', id: 'LUXE' },
    { country: 'Egypt', name: 'Luxor', id: 'LUXO' },

    { country: 'France', name: 'Lyon', id: 'LYON' },

    { country: 'Netherlands', name: 'Maastricht', id: 'MAAS' },

    { country: 'Macau', name: 'Macau', id: 'MFMA' },

    { country: 'Spain', name: 'Madrid', id: 'MADR' },
    { country: 'India', name: 'Madurai', id: 'IIXM' },

    { country: 'Spain', name: 'Malaga', id: 'MALA' },

    { country: 'Kenya', name: 'Malindi', id: 'MYDA' },
    { country: 'Sweden', name: 'Malmo', id: 'MALM' },
    { country: 'Maldives', name: 'Malé', id: 'MLEA' },

    { country: 'Nicaragua', name: 'Managua', id: 'MGAA' },
    { country: 'Bahrain', name: 'Manama', id: 'BAHA' },

    { country: 'United Kingdom', name: 'Manchester', id: 'MANC' },
    { country: 'Myanmar', name: 'Mandalay', id: 'MDLM' },

    { country: 'Philippines', name: 'Manila', id: 'MNLP' },

    { country: 'Mozambique', name: 'Maputo', id: 'MPMA' },
    { country: 'Argentina', name: 'Mar Del Plata', id: 'MDQA' },
    { country: 'Venezuela', name: 'Maracaibo', id: 'MARB' },

    { country: 'Morocco', name: 'Marrakech Menara', id: 'MARR' },
    { country: 'France', name: 'Marseille', id: 'MARS' },

    { country: 'Iran', name: 'Mashhad', id: 'MHDA' },

    { country: 'Indonesia', name: 'Medan', id: 'MESI' },
    { country: 'Colombia', name: 'Medellin', id: 'MDEA' },

    { country: 'Colombia', name: 'Medina', id: 'MNDA' },

    { country: 'Australia', name: 'Melbourne', id: 'MELA' },

    { country: 'Mexico', name: 'Mexico City', id: 'MEXA' },

    { country: 'United States', name: 'Miami', id: 'MIAA' },

    { country: 'Italy', name: 'Milan', id: 'MILA' },

    { country: 'Belarus', name: 'Minsk', id: 'MSQA' },

    { country: 'Somalia', name: 'Mogadishu', id: 'MGQA' },

    { country: 'Kenya', name: 'Mombasa', id: 'MBAA' },

    { country: 'Tunisia', name: 'Monastir', id: 'MONA' },

    { country: 'Monaco', name: 'Monte Carlo', id: 'MCMA' },

    { country: 'Jamaica', name: 'Montego Bay', id: 'MBJA' },
    { country: 'Serbia', name: 'Novi Sad', id: 'NOVI' },
    { country: 'Colombia', name: 'Monterrey', id: 'MOYA' },
    { country: 'Uruguay', name: 'Montevideo', id: 'MVDA' },

    { country: 'France', name: 'Montpellier', id: 'MONT' },
    { country: 'Canada', name: 'Montreal', id: 'YMQA' },
    { country: 'Russia', name: 'Novosibirsk', id: 'OVBA' },

    { country: 'Russia', name: 'Moscow', id: 'MOSC' },

    { country: 'Bosnia and Herzegovina', name: 'Mostar', id: 'MOST' },

    { country: 'India', name: 'Mumbai', id: 'IBOM' },
    { country: 'Germany', name: 'Munich', id: 'MUNI' },
    { country: 'Oman', name: 'Muscat', id: 'MCTA' },

    { country: 'Fiji', name: 'Nadi', id: 'NANF' },
    { country: 'Japan', name: 'Nagasaki', id: 'JNGS' },
    { country: 'Japan', name: 'Nagoya', id: 'JNGO' },
    { country: 'Indonesia', name: 'Naha', id: 'NAHI' },
    { country: 'Kenya', name: 'Nairobi', id: 'NBOA' },

    { country: 'France', name: 'Nancy', id: 'ENCA' },

    { country: 'China', name: 'Nanning', id: 'CNNG' },
    { country: 'France', name: 'Nantes', id: 'NANT' },

    { country: 'Italy', name: 'Naples', id: 'NAPL' },

    { country: 'Bahamas', name: 'Nassau', id: 'NASA' },

    { country: 'Myanmar', name: 'Naypyidaw', id: 'NYTM' },

    { country: 'Germany', name: 'Nuremberg', id: 'NURE' },
    { country: 'India', name: 'New Delhi', id: 'IDEL' },
    { country: 'United States', name: 'New Haven', id: 'HVNA' },
    { country: 'Greenland', name: 'Nuuk', id: 'GOHA' },
    { country: 'United States', name: 'New Orleans', id: 'MSYA' },

    { country: 'United States', name: 'New York', id: 'NYCA' },
    { country: 'United Kingdom', name: 'Newcastle', id: 'NEWC' },

    { country: 'France', name: 'Nice', id: 'NICE' },
    { country: 'Cyprus', name: 'Nicosia', id: 'NICA' },

    { country: 'Russia', name: 'Nizhniy Novgorod', id: 'NIZH' },
    { country: 'Mauritania', name: 'Nouakchott', id: 'NKCA' },

    { country: 'Japan', name: 'Okayama', id: 'JOKJ' },

    { country: 'Russia', name: 'Omsk', id: 'OMSK' },

    { country: 'Argentina', name: 'Oran', id: 'ORAA' },

    { country: 'Japan', name: 'Osaka', id: 'OSAA' },

    { country: 'Norway', name: 'Oslo', id: 'OSLO' },

    { country: 'Czechia', name: 'Ostrava', id: 'OSTR' },
    { country: 'Canada', name: 'Ottawa', id: 'YOWA' },

    { country: 'Burkina Faso', name: 'Ouagadougou', id: 'OUAA' },

    { country: 'United Kingdom', name: 'Oxford', id: 'OXFA' },

    { country: 'Italy', name: 'Palermo', id: 'PALE' },

    { country: 'Spain', name: 'Palma', id: 'PALM' },

    { country: 'Panama', name: 'Panama City', id: 'PTYA' },

    { country: 'French Polynesia', name: 'Papeete', id: 'PPTP' },

    { country: 'France', name: 'Paris', id: 'PARI' },
    { country: 'Italy', name: 'Parma', id: 'PARM' },
    { country: 'Bhutan', name: 'Paro', id: 'PBHA' },
    { country: 'Greece', name: 'Paros', id: 'PARO' },

    { country: 'Cyprus', name: 'Paphos', id: 'PAPH' },

    { country: 'Thailand', name: 'Pattaya', id: 'PYXT' },

    { country: 'Australia', name: 'Perth', id: 'PERA' },

    { country: 'United States', name: 'Philadelphia', id: 'PHLA' },

    { country: 'Cambodia', name: 'Phnom Penh', id: 'PNHK' },
    { country: 'United States', name: 'Phoenix', id: 'PHXA' },
    { country: 'Thailand', name: 'Phuket Island', id: 'HKTT' },
    { country: 'Italy', name: 'Pisa', id: 'PISA' },
    { country: 'Haiti', name: 'Port Au Prince', id: 'PAPA' },
    { country: 'Nigeria', name: 'Port Harcourt', id: 'PHCA' },
    { country: 'Papua New Guinea', name: 'Port Moresby', id: 'POMP' },
    { country: 'Egypt', name: 'Port Said', id: 'PORZ' },
    { country: 'Sudan', name: 'Port Sudan', id: 'PZUA' },
    { country: 'Vanuatu', name: 'Port Vila', id: 'VLIV' },
    { country: 'United States', name: 'Portland', id: 'PDXA' },
    { country: 'Portugal', name: 'Porto', id: 'PORT' },
    {
      country: 'Saint Vincent and the Grenadines',
      name: 'Port Elizabeth',
      id: 'BQUA',
    },
    { country: 'Czechia', name: 'Prague', id: 'PRAG' },
    { country: 'Brazil', name: 'Porto Alegre', id: 'POAA' },
    { country: 'South Africa', name: 'Pretoria', id: 'PRYA' },
    { country: 'Mexico', name: 'Puebla', id: 'PBCA' },
    { country: 'Cape Verde', name: 'Praia', id: 'RAIA' },
    { country: 'Philippines', name: 'Puerto Princesa', id: 'PPSP' },
    { country: 'Mexico', name: 'Puerto Vallarta', id: 'PVRA' },
    { country: 'Chile', name: 'Punta Arenas', id: 'PUQA' },
    { country: 'Uruguay', name: 'Punta Del Este', id: 'PDPA' },
    { country: 'North Korea', name: 'Pyongyang', id: 'FNJA' },
    { country: 'Canada', name: 'Quebec', id: 'YQBA' },
    { country: 'Dominican Republic', name: 'Punta Cana', id: 'PUJA' },
    { country: 'Ecuador', name: 'Quito', id: 'UIOA' },
    { country: 'Morocco', name: 'Rabat', id: 'RABA' },
    { country: 'Brazil', name: 'Recife', id: 'RECA' },
    { country: 'France', name: 'Reims', id: 'REIM' },
    { country: 'Iceland', name: 'Reykjavik', id: 'REYK' },
    { country: 'Latvia', name: 'Riga', id: 'RIGA' },
    { country: 'Croatia', name: 'Rijeka', id: 'RUJE' },
    { country: 'Brazil', name: 'Rio De Janeiro', id: 'RIOA' },
    { country: 'Saudi Arabia', name: 'Riyadh', id: 'RUHA' },

    { country: 'Argentina', name: 'Rio Gallegos', id: 'RGLA' },

    { country: 'Italy', name: 'Rome', id: 'ROME' },

    { country: 'Argentina', name: 'Rosario', id: 'ROSA' },

    { country: 'Russia', name: 'Rostov-on-Don', id: 'ROSV' },

    { country: 'Netherlands', name: 'Rotterdam', id: 'ROTT' },

    { country: 'France', name: 'Rouen', id: 'ROUE' },

    { country: 'Oman', name: 'Salalah', id: 'SLLA' },
    { country: 'United States', name: 'Sacramento', id: 'SACA' },

    { country: 'France', name: 'Saint Tropez', id: 'SAIN' },

    { country: 'Austria', name: 'Salzburg', id: 'SALZ' },

    { country: 'Spain', name: 'Salamanca', id: 'SALA' },

    { country: 'United States', name: 'San Diego', id: 'SANA' },

    { country: 'United States', name: 'San Francisco', id: 'SFOA' },

    { country: 'Costa Rica', name: 'San Jose', id: 'SJOA' },
    { country: 'Philippines', name: 'San Jose', id: 'SJIP' },
    { country: 'San Marino', name: 'San Marino', id: 'SAIA' },

    { country: 'Yemen', name: "Sana'a", id: 'SAHA' },

    { country: 'Spain', name: 'Santiago de Compostela', id: 'SANC' },
    { country: 'Dominican Republic', name: 'Santo Domingo', id: 'SDQA' },
    { country: 'Greece', name: 'Santorini (Thira)', id: 'THIR' },

    { country: 'Brazil', name: 'Sao Paulo', id: 'SAOA' },

    { country: 'Bosnia and Herzegovina', name: 'Sarajevo', id: 'SARA' },

    { country: 'United States', name: 'Seattle', id: 'SEAA' },

    { country: 'Japan', name: 'Sendai', id: 'JSDJ' },

    { country: 'South Korea', name: 'Seoul', id: 'SELA' },

    { country: 'Ukraine', name: 'Sevastopol', id: 'UKSA' },
    { country: 'Spain', name: 'Seville', id: 'SEVI' },

    { country: 'Tunisia', name: 'Sfax El Maou', id: 'SFAX' },

    { country: 'China', name: 'Shanghai', id: 'CSHA' },

    { country: 'United Arab Emirates', name: 'Sharjah', id: 'SHJA' },

    { country: 'China', name: 'Shenyang', id: 'CSHE' },

    { country: 'Iran', name: 'Shiraz', id: 'SYZA' },

    { country: 'China', name: 'Shenzhen', id: 'CSZX' },

    { country: 'Italy', name: 'Siena', id: 'SIEN' },

    { country: 'Singapore', name: 'Singapore', id: 'SINS' },

    { country: 'Bulgaria', name: 'Sofia', id: 'SOFI' },

    { country: 'North Macedonia', name: 'Skopje', id: 'SKOP' },
    { country: 'Croatia', name: 'Split', id: 'SPLI' },

    { country: 'United States', name: 'St Louis', id: 'STLA' },
    { country: 'Russia', name: 'St Petersburg', id: 'PETE' },

    { country: 'Sweden', name: 'Stockholm', id: 'STOC' },

    { country: 'France', name: 'Strasbourg', id: 'STRA' },

    { country: 'India', name: 'Surat', id: 'ISTV' },

    { country: 'Fiji', name: 'Suva', id: 'SUVF' },

    { country: 'Australia', name: 'Sydney', id: 'SYDA' },

    { country: 'Iran', name: 'Tabriz', id: 'TBZA' },

    { country: 'Taiwan', name: 'Taichung', id: 'TXGT' },
    { country: 'Taiwan', name: 'Taipei', id: 'TPET' },

    { country: 'Estonia', name: 'Tallinn', id: 'TALL' },

    { country: 'Finland', name: 'Tampere', id: 'TAMP' },

    { country: 'Morocco', name: 'Tangier', id: 'TANG' },

    { country: 'Uzbekistan', name: 'Tashkent', id: 'TASA' },

    { country: 'Georgia', name: 'Tbilisi', id: 'TBLI' },

    { country: 'Iran', name: 'Tehran', id: 'THRA' },

    { country: 'Israel', name: 'Tel Aviv', id: 'TELA' },

    { country: 'Netherlands', name: 'The Hague', id: 'THEH' },

    { country: 'Greece', name: 'Thessaloniki', id: 'THES' },

    { country: 'China', name: 'Tianjin', id: 'CTSN' },

    { country: 'Romania', name: 'Timisoara', id: 'TIMI' },

    { country: 'Albania', name: 'Tirana', id: 'TIRA' },

    { country: 'Japan', name: 'Tokyo', id: 'TYOA' },
    { country: 'Brazil', name: 'Toledo', id: 'TOWA' },

    { country: 'Canada', name: 'Toronto', id: 'YTOA' },

    { country: 'France', name: 'Toulouse', id: 'TOUS' },
    { country: 'France', name: 'Tours', id: 'TOUR' },

    { country: 'Libya', name: 'Tripoli', id: 'TIPA' },

    { country: 'Norway', name: 'Tromso', id: 'TROM' },
    { country: 'Norway', name: 'Trondheim', id: 'TRON' },

    { country: 'Russia', name: 'Tula', id: 'TULA' },

    { country: 'Tunisia', name: 'Tunis Carthage', id: 'TUNI' },

    { country: 'Italy', name: 'Turin', id: 'TURI' },

    { country: 'Mongolia', name: 'Ulaanbaatar', id: 'ULNA' },

    { country: 'Argentina', name: 'Ushuaia', id: 'USHA' },

    { country: 'Venezuela', name: 'Valencia', id: 'VLNA' },

    { country: 'Malta', name: 'Valletta', id: 'MLAA' },
    { country: 'Chile', name: 'Valparaiso', id: 'VAPA' },

    { country: 'Canada', name: 'Vancouver', id: 'YVRA' },

    { country: 'Italy', name: 'Venice', id: 'VENI' },

    { country: 'Mexico', name: 'Veracruz', id: 'VERA' },

    { country: 'Italy', name: 'Verona', id: 'VERO' },
    { country: 'United States', name: 'Versailles', id: 'VRSA' },

    { country: 'Canada', name: 'Victoria', id: 'YYJA' },

    { country: 'Austria', name: 'Vienna', id: 'VIEN' },
    { country: 'Laos', name: 'Vientiane', id: 'VTEL' },

    { country: 'Lithuania', name: 'Vilnius', id: 'VILN' },

    { country: 'Russia', name: 'Vladivostok', id: 'VLAD' },

    { country: 'Russia', name: 'Volgograd', id: 'VOLH' },

    { country: 'Poland', name: 'Warsaw', id: 'WARS' },

    { country: 'United States', name: 'Washington', id: 'WASA' },

    { country: 'New Zealand', name: 'Wellington', id: 'WLGN' },

    { country: 'Namibia', name: 'Windhoek', id: 'WDHA' },
    { country: 'Poland', name: 'Wroclaw', id: 'WROC' },
    { country: 'China', name: 'Wuhan', id: 'CWUH' },
    { country: 'China', name: 'Xiamen', id: 'CXMN' },
    { country: 'Myanmar', name: 'Yangon', id: 'RGNM' },
    { country: 'Armenia', name: 'Yerevan', id: 'EVNA' },
    { country: 'Indonesia', name: 'Yogyakarta', id: 'JOGI' },
    { country: 'United States', name: 'York', id: 'THVA' },
    { country: 'Croatia', name: 'Zagreb', id: 'ZAGR' },
    { country: 'Tanzania', name: 'Zanzibar', id: 'ZNZA' },
    { country: 'Spain', name: 'Zaragoza', id: 'ZARA' },
    { country: 'Switzerland', name: 'Zurich', id: 'ZURI' },
  ];

  const airports = Airports.map((el) => (
    <option key={el.id} value={el.id}>
      {el.name}
    </option>
  ));

  return airports;
}
