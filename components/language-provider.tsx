'use client'

import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'

type Language = 'en' | 'fr'
type Currency = 'MUR' | 'USD' | 'GBP' | 'EUR'

const currencyOptions = ['MUR', 'USD', 'GBP', 'EUR'] as const

const currencyConfig: Record<Currency, { locale: string; rateFromMur: number }> = {
  MUR: { locale: 'en-MU', rateFromMur: 1 },
  USD: { locale: 'en-US', rateFromMur: 1 / 46 },
  GBP: { locale: 'en-GB', rateFromMur: 1 / 58 },
  EUR: { locale: 'fr-FR', rateFromMur: 1 / 50 },
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.portfolio': 'Land Portfolio',
    'nav.about': 'About',
    'nav.insights': 'Insights',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.schedule': 'Schedule Consultation',
    'language.label': 'Language',
    'language.switch': 'Switch language',
    'currency.label': 'Currency',
    'currency.switch': 'Switch currency',
    'gallery.previous': 'Previous property image',
    'gallery.next': 'Next property image',
    'gallery.showImage': 'Show property image',
    'price.from': 'From',
    'price.monthSuffix': '/month',
    'chatbot.open': 'Open chat',
    'chatbot.close': 'Close chat',
    'chatbot.title': 'Vestate Assistant',
    'chatbot.status': 'Online',
    'chatbot.initial':
      'Hello. I can help with land sales, agricultural land, house rentals, hotel development, or scheduling a consultation.',
    'chatbot.placeholder': 'Type your message...',
    'chatbot.send': 'Send message',
    'chatbot.land': 'Land for sale',
    'chatbot.agri': 'Agricultural land',
    'chatbot.rent': 'House rentals',
    'chatbot.hotel': 'Hotel development',
    'chatbot.visit': 'Schedule a visit',
    'chatbot.landReply':
      'Here are the land sale opportunities. You can browse premium residential, commercial, and investment plots.',
    'chatbot.agriReply':
      'Here are the agricultural land opportunities for farming, cultivation, and agribusiness ownership.',
    'chatbot.rentReply':
      'Here are selected houses and villas available for rent in Mauritius.',
    'chatbot.hotelReply':
      'Here are hotel and resort development opportunities in Seychelles.',
    'chatbot.contactReply':
      'Jaunbocus Uways can help you with the next step. You can request a consultation on the contact page.',
    'chatbot.currencyReply':
      'Use the currency selector in the header to view prices in MUR, USD, GBP, or EUR.',
    'chatbot.defaultReply':
      'I can help with land sales, agricultural land, house rentals, hotel projects, pricing, or consultations.',
    'chatbot.openLink': 'Open page',

    'hero.eyebrow': 'Premium Land Investment in Mauritius',
    'hero.titleTop': 'Discover Exclusive',
    'hero.titleAccent': 'Land Opportunities',
    'hero.description':
      "Invest in paradise with our curated selection of premium plots in Mauritius' most prestigious locations.",
    'hero.explore': 'Explore Portfolio',
    'hero.schedule': 'Schedule Consultation',
    'hero.scroll': 'Scroll',

    'search.propertyType': 'Property Type',
    'search.region': 'Region',
    'search.minBudget': 'Min Budget (MUR)',
    'search.maxBudget': 'Max Budget (MUR)',
    'search.allTypes': 'All Types',
    'search.allRegions': 'All Regions',
    'search.any': 'Any',
    'search.submit': 'Search',

    'intro.eyebrow': 'About Vestate',
    'intro.title': 'A Trusted Land and Development Company',
    'intro.body1':
      'Founded in 2009, Vestate Properties is situated on Royal Road in Grand Baie, Mauritius. The company works with private clients, investors, and businesses looking for secure land opportunities in prime locations.',
    'intro.body2':
      'Vestate activities include selling land, selling agricultural land, renting houses, and developing hospitality projects, including hotel development in Seychelles.',
    'intro.location': 'Location',
    'intro.place': 'Royal Road, Grand Baie',
    'intro.landSales': 'Land Sales',
    'intro.landSalesDesc':
      'Premium residential, commercial, and investment land opportunities across Mauritius.',
    'intro.agriSales': 'Agricultural Land Sales',
    'intro.agriSalesDesc':
      'Agricultural land available for farming, agribusiness, and long-term ownership.',
    'intro.hotelDevelopment': 'Hotel Development',
    'intro.hotelDevelopmentDesc':
      'Strategic hotel development projects, including hospitality opportunities in Seychelles.',

    'featured.eyebrow': 'Exclusive Selection',
    'featured.title': 'Featured Opportunities',
    'featured.description':
      'Discover selected opportunities across land sales, agricultural land sales, house rentals, and hotel development.',
    'featured.landEyebrow': 'Land for Sale',
    'featured.landTitle': 'Featured Land Opportunities',
    'featured.agriEyebrow': 'Agricultural Land for Sale',
    'featured.agriTitle': 'Featured Agricultural Land',
    'featured.houseEyebrow': 'House for Rent',
    'featured.houseTitle': 'Featured Rental Homes',
    'featured.hotelEyebrow': 'Hotel Development',
    'featured.hotelTitle': 'Hotel Projects in Seychelles',
    'featured.viewAll': 'View All Properties',

    'agent.eyebrow': 'Meet Your Agent',
    'agent.title': 'Personal Guidance for Every Opportunity',
    'agent.body1':
      'Jaunbocus Uways represents Vestate Properties with a focused, client-first approach to land investment and development opportunities.',
    'agent.body2':
      "He assists clients across Vestate's core activities, including land sales, agricultural land sales, house rentals, and hotel development opportunities in Seychelles.",
    'agent.cardEyebrow': 'Vestate Agent',
    'agent.contact': 'Contact Jaunbocus',
    'agent.call': 'Call Agent',
    'agent.specialtyLand': 'Land Sales',
    'agent.specialtyAgri': 'Agricultural Sales',
    'agent.specialtyHouse': 'House Rentals',
    'agent.specialtyHotel': 'Hotel Development',

    'stats.eyebrow': 'Our Track Record',
    'stats.title': 'Excellence in Numbers',

    'investmentHome.eyebrow': 'Investment Opportunity',
    'investmentHome.titleTop': 'Why Invest in',
    'investmentHome.titleAccent': 'Mauritius Land',
    'investmentHome.description':
      'Mauritius offers a unique combination of political stability, favorable tax environment, and exceptional natural beauty, making it the premier destination for luxury land investment.',
    'investmentHome.secure': 'Secure Investment',
    'investmentHome.secureDesc':
      'Full legal protection with transparent documentation and due diligence.',
    'investmentHome.foreign': 'Foreign Ownership',
    'investmentHome.foreignDesc':
      'Eligible properties under IRS and PDS schemes for international investors.',
    'investmentHome.returns': 'High Returns',
    'investmentHome.returnsDesc':
      'Consistent appreciation with average returns of 12-18% annually.',
    'investmentHome.locations': 'Premium Locations',
    'investmentHome.locationsDesc':
      'Exclusive access to the most prestigious land parcels in Mauritius.',
    'investmentHome.learnMore': 'Learn More',
    'investmentHome.averageReturn': 'Average Annual Return',
    'investmentHome.averageReturnDesc':
      'on premium land investments over the past 5 years',

    'lifestyle.eyebrow': 'The Mauritius Lifestyle',
    'lifestyle.titleTop': 'Experience',
    'lifestyle.titleAccent': 'Paradise Living',
    'lifestyle.body1':
      'Mauritius is more than an investment destination. It is a gateway to an extraordinary lifestyle. Crystal-clear lagoons, pristine beaches, and lush tropical landscapes create the perfect backdrop for luxury living.',
    'lifestyle.body2':
      'From world-class golf courses and exclusive beach clubs to fine dining and vibrant cultural experiences, Mauritius offers a unique blend of relaxation and sophistication.',
    'lifestyle.body3':
      'Your land investment here is not just about returns. It is about securing your place in one of the world’s most desirable destinations.',
    'lifestyle.sunny': 'Sunny Days Per Year',
    'lifestyle.golf': 'Golf Courses',
    'lifestyle.safe': 'Safest Countries',

    'cta.eyebrow': 'Start Your Journey',
    'cta.titleTop': 'Ready to Invest in',
    'cta.titleAccent': 'Your Future?',
    'cta.description':
      'Connect with our team of luxury land specialists and discover the perfect investment opportunity tailored to your goals.',
    'cta.browse': 'Browse Properties',
    'cta.schedule': 'Schedule Consultation',

    'portfolio.land.label': 'Land for Sale',
    'portfolio.land.eyebrow': 'Land Portfolio',
    'portfolio.land.title': 'Discover Premium Lands',
    'portfolio.land.description':
      'Explore our curated collection of exceptional land opportunities across Mauritius.',
    'portfolio.agri.label': 'Agricultural Land',
    'portfolio.agri.eyebrow': 'Agricultural Land for Sale',
    'portfolio.agri.title': 'Agricultural Land for Sale',
    'portfolio.agri.description':
      'Browse productive agricultural land available for farming, cultivation, and agribusiness ownership.',
    'portfolio.house.label': 'House for Rent',
    'portfolio.house.eyebrow': 'House Rentals',
    'portfolio.house.title': 'Houses for Rent',
    'portfolio.house.description':
      'Explore selected houses and villas available for rent across Mauritius.',
    'portfolio.hotel.label': 'Hotel Development',
    'portfolio.hotel.eyebrow': 'Hotel Development',
    'portfolio.hotel.title': 'Hotel Projects in Seychelles',
    'portfolio.hotel.description':
      'Explore selected hotel and resort development opportunities in Seychelles.',
    'portfolio.filters': 'Filters',
    'portfolio.clearAll': 'Clear all',
    'portfolio.propertiesFound': 'properties found',
    'portfolio.sortNewest': 'Newest First',
    'portfolio.sortPriceLow': 'Price: Low to High',
    'portfolio.sortPriceHigh': 'Price: High to Low',
    'portfolio.sortSize': 'Largest First',
    'portfolio.status': 'Status',
    'portfolio.allStatus': 'All Status',
    'portfolio.available': 'Available',
    'portfolio.reserved': 'Reserved',
    'portfolio.sold': 'Sold',
    'portfolio.minPrice': 'Min Price (MUR)',
    'portfolio.maxPrice': 'Max Price (MUR)',
    'portfolio.noMatches': 'No properties match your criteria',
    'portfolio.clearTry': 'Clear filters and try again',

    'footer.description':
      "Your premier destination for luxury land investment in Mauritius. Discover exceptional plots in the world's most prestigious locations.",
    'footer.explore': 'Explore',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.featured': 'Featured Properties',
    'footer.investmentGuide': 'Investment Guide',
    'footer.marketInsights': 'Market Insights',
    'footer.aboutUs': 'About Us',
    'footer.ourTeam': 'Our Team',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.contactUs': 'Contact Us',
    'footer.faqs': 'FAQs',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': 'All rights reserved.',
    'footer.backToTop': 'Back to top',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.portfolio': 'Portefeuille',
    'nav.about': 'A propos',
    'nav.insights': 'Actualites',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.schedule': 'Planifier une consultation',
    'language.label': 'Langue',
    'language.switch': 'Changer de langue',
    'currency.label': 'Devise',
    'currency.switch': 'Changer de devise',
    'gallery.previous': 'Image precedente de la propriete',
    'gallery.next': 'Image suivante de la propriete',
    'gallery.showImage': 'Afficher l image de la propriete',
    'price.from': 'A partir de',
    'price.monthSuffix': '/mois',
    'chatbot.open': 'Ouvrir le chat',
    'chatbot.close': 'Fermer le chat',
    'chatbot.title': 'Assistant Vestate',
    'chatbot.status': 'En ligne',
    'chatbot.initial':
      'Bonjour. Je peux vous aider pour la vente de terrains, les terrains agricoles, les maisons a louer, le developpement hotelier ou une consultation.',
    'chatbot.placeholder': 'Ecrivez votre message...',
    'chatbot.send': 'Envoyer le message',
    'chatbot.land': 'Terrains a vendre',
    'chatbot.agri': 'Terrains agricoles',
    'chatbot.rent': 'Maisons a louer',
    'chatbot.hotel': 'Developpement hotelier',
    'chatbot.visit': 'Planifier une visite',
    'chatbot.landReply':
      'Voici les opportunites de terrains a vendre. Vous pouvez parcourir des terrains residentiels, commerciaux et d investissement.',
    'chatbot.agriReply':
      'Voici les opportunites de terrains agricoles pour l agriculture, la culture et l agrobusiness.',
    'chatbot.rentReply':
      'Voici une selection de maisons et villas disponibles a la location a Maurice.',
    'chatbot.hotelReply':
      'Voici les opportunites de developpement hotelier et de resort aux Seychelles.',
    'chatbot.contactReply':
      'Jaunbocus Uways peut vous accompagner pour la prochaine etape. Vous pouvez demander une consultation sur la page contact.',
    'chatbot.currencyReply':
      'Utilisez le selecteur de devise dans le header pour voir les prix en MUR, USD, GBP ou EUR.',
    'chatbot.defaultReply':
      'Je peux vous aider pour les ventes de terrains, les terrains agricoles, les maisons a louer, les projets hoteliers, les prix ou les consultations.',
    'chatbot.openLink': 'Ouvrir la page',

    'hero.eyebrow': 'Investissement foncier premium a Maurice',
    'hero.titleTop': 'Decouvrez des',
    'hero.titleAccent': 'opportunites foncieres exclusives',
    'hero.description':
      'Investissez dans un cadre d’exception avec notre selection de terrains premium dans les emplacements les plus recherches de Maurice.',
    'hero.explore': 'Explorer le portefeuille',
    'hero.schedule': 'Planifier une consultation',
    'hero.scroll': 'Defiler',

    'search.propertyType': 'Type de bien',
    'search.region': 'Region',
    'search.minBudget': 'Budget min. (MUR)',
    'search.maxBudget': 'Budget max. (MUR)',
    'search.allTypes': 'Tous les types',
    'search.allRegions': 'Toutes les regions',
    'search.any': 'Indifferent',
    'search.submit': 'Rechercher',

    'intro.eyebrow': 'A propos de Vestate',
    'intro.title': 'Une societe de confiance dans le foncier et le developpement',
    'intro.body1':
      'Fondee en 2009, Vestate Properties est situee sur la Royal Road a Grand Baie, Maurice. La societe accompagne les clients prives, les investisseurs et les entreprises a la recherche d’opportunites foncieres solides.',
    'intro.body2':
      'Les activites de Vestate comprennent la vente de terrains, la vente de terrains agricoles, la location de maisons et le developpement de projets hoteliers, notamment aux Seychelles.',
    'intro.location': 'Adresse',
    'intro.place': 'Royal Road, Grand Baie',
    'intro.landSales': 'Vente de terrains',
    'intro.landSalesDesc':
      'Opportunites de terrains residentiels, commerciaux et d’investissement a Maurice.',
    'intro.agriSales': 'Vente de terrains agricoles',
    'intro.agriSalesDesc':
      'Terrains agricoles disponibles pour l’agriculture, l’agrobusiness et la propriete a long terme.',
    'intro.hotelDevelopment': 'Developpement hotelier',
    'intro.hotelDevelopmentDesc':
      'Projets hoteliers strategiques, incluant des opportunites d’hospitalite aux Seychelles.',

    'featured.eyebrow': 'Selection exclusive',
    'featured.title': 'Opportunites en vedette',
    'featured.description':
      'Decouvrez une selection d’opportunites en vente de terrains, vente de terrains agricoles, location de maisons et developpement hotelier.',
    'featured.landEyebrow': 'Terrain a vendre',
    'featured.landTitle': 'Terrains en vedette',
    'featured.agriEyebrow': 'Terrain agricole a vendre',
    'featured.agriTitle': 'Terrains agricoles en vedette',
    'featured.houseEyebrow': 'Maison a louer',
    'featured.houseTitle': 'Maisons a louer en vedette',
    'featured.hotelEyebrow': 'Developpement hotelier',
    'featured.hotelTitle': 'Projets hoteliers aux Seychelles',
    'featured.viewAll': 'Voir toutes les proprietes',

    'agent.eyebrow': 'Votre agent',
    'agent.title': 'Un accompagnement personnalise pour chaque opportunite',
    'agent.body1':
      'Jaunbocus Uways represente Vestate Properties avec une approche attentive, professionnelle et centree sur le client.',
    'agent.body2':
      'Il accompagne les clients dans les activites principales de Vestate: vente de terrains, vente de terrains agricoles, location de maisons et opportunites de developpement hotelier aux Seychelles.',
    'agent.cardEyebrow': 'Agent Vestate',
    'agent.contact': 'Contacter Jaunbocus',
    'agent.call': 'Appeler l’agent',
    'agent.specialtyLand': 'Vente de terrains',
    'agent.specialtyAgri': 'Vente agricole',
    'agent.specialtyHouse': 'Location de maisons',
    'agent.specialtyHotel': 'Developpement hotelier',

    'stats.eyebrow': 'Notre parcours',
    'stats.title': 'L’excellence en chiffres',

    'investmentHome.eyebrow': 'Opportunite d’investissement',
    'investmentHome.titleTop': 'Pourquoi investir dans',
    'investmentHome.titleAccent': 'les terrains a Maurice',
    'investmentHome.description':
      'Maurice combine stabilite politique, fiscalite attractive et beaute naturelle exceptionnelle, ce qui en fait une destination de choix pour l’investissement foncier de luxe.',
    'investmentHome.secure': 'Investissement securise',
    'investmentHome.secureDesc':
      'Protection juridique complete avec documentation transparente et verification approfondie.',
    'investmentHome.foreign': 'Propriete etrangere',
    'investmentHome.foreignDesc':
      'Biens eligibles aux regimes IRS et PDS pour les investisseurs internationaux.',
    'investmentHome.returns': 'Rendements eleves',
    'investmentHome.returnsDesc':
      'Appreciation reguliere avec des rendements moyens de 12 a 18 % par an.',
    'investmentHome.locations': 'Emplacements premium',
    'investmentHome.locationsDesc':
      'Acces exclusif aux parcelles les plus prestigieuses de Maurice.',
    'investmentHome.learnMore': 'En savoir plus',
    'investmentHome.averageReturn': 'Rendement annuel moyen',
    'investmentHome.averageReturnDesc':
      'sur les investissements fonciers premium des 5 dernieres annees',

    'lifestyle.eyebrow': 'Le style de vie mauricien',
    'lifestyle.titleTop': 'Vivez',
    'lifestyle.titleAccent': 'le paradis',
    'lifestyle.body1':
      'Maurice est plus qu’une destination d’investissement. C’est une porte vers un style de vie exceptionnel, entre lagons cristallins, plages preservees et paysages tropicaux.',
    'lifestyle.body2':
      'Des parcours de golf de classe mondiale aux clubs de plage exclusifs, en passant par la gastronomie et la culture, Maurice offre un equilibre unique entre detente et sophistication.',
    'lifestyle.body3':
      'Votre investissement foncier ici ne concerne pas seulement le rendement. Il permet aussi d’assurer votre place dans l’une des destinations les plus recherchees au monde.',
    'lifestyle.sunny': 'Jours de soleil par an',
    'lifestyle.golf': 'Parcours de golf',
    'lifestyle.safe': 'Pays les plus surs',

    'cta.eyebrow': 'Commencez votre parcours',
    'cta.titleTop': 'Pret a investir dans',
    'cta.titleAccent': 'votre avenir ?',
    'cta.description':
      'Contactez notre equipe de specialistes du foncier de luxe et trouvez l’opportunite d’investissement adaptee a vos objectifs.',
    'cta.browse': 'Voir les proprietes',
    'cta.schedule': 'Planifier une consultation',

    'portfolio.land.label': 'Terrains a vendre',
    'portfolio.land.eyebrow': 'Portefeuille foncier',
    'portfolio.land.title': 'Decouvrez des terrains premium',
    'portfolio.land.description':
      'Explorez notre collection de terrains d’exception a Maurice.',
    'portfolio.agri.label': 'Terrains agricoles',
    'portfolio.agri.eyebrow': 'Terrains agricoles a vendre',
    'portfolio.agri.title': 'Terrains agricoles a vendre',
    'portfolio.agri.description':
      'Parcourez des terrains agricoles disponibles pour l’agriculture, la culture et l’agrobusiness.',
    'portfolio.house.label': 'Maisons a louer',
    'portfolio.house.eyebrow': 'Location de maisons',
    'portfolio.house.title': 'Maisons a louer',
    'portfolio.house.description':
      'Explorez une selection de maisons et villas a louer a Maurice.',
    'portfolio.hotel.label': 'Developpement hotelier',
    'portfolio.hotel.eyebrow': 'Developpement hotelier',
    'portfolio.hotel.title': 'Projets hoteliers aux Seychelles',
    'portfolio.hotel.description':
      'Explorez des opportunites de developpement hotelier et de resort aux Seychelles.',
    'portfolio.filters': 'Filtres',
    'portfolio.clearAll': 'Tout effacer',
    'portfolio.propertiesFound': 'proprietes trouvees',
    'portfolio.sortNewest': 'Plus recent',
    'portfolio.sortPriceLow': 'Prix: croissant',
    'portfolio.sortPriceHigh': 'Prix: decroissant',
    'portfolio.sortSize': 'Plus grand',
    'portfolio.status': 'Statut',
    'portfolio.allStatus': 'Tous les statuts',
    'portfolio.available': 'Disponible',
    'portfolio.reserved': 'Reserve',
    'portfolio.sold': 'Vendu',
    'portfolio.minPrice': 'Prix min. (MUR)',
    'portfolio.maxPrice': 'Prix max. (MUR)',
    'portfolio.noMatches': 'Aucune propriete ne correspond a vos criteres',
    'portfolio.clearTry': 'Effacer les filtres et reessayer',

    'footer.description':
      'Votre destination premium pour l’investissement foncier de luxe a Maurice. Decouvrez des terrains d’exception dans des emplacements prestigieux.',
    'footer.explore': 'Explorer',
    'footer.company': 'Societe',
    'footer.support': 'Support',
    'footer.featured': 'Proprietes en vedette',
    'footer.investmentGuide': 'Guide d’investissement',
    'footer.marketInsights': 'Actualites du marche',
    'footer.aboutUs': 'A propos',
    'footer.ourTeam': 'Notre equipe',
    'footer.careers': 'Carrieres',
    'footer.press': 'Presse',
    'footer.contactUs': 'Nous contacter',
    'footer.faqs': 'FAQ',
    'footer.privacy': 'Politique de confidentialite',
    'footer.terms': 'Conditions d’utilisation',
    'footer.rights': 'Tous droits reserves.',
    'footer.backToTop': 'Retour en haut',
  },
} as const

const frPhrases: Record<string, string> = {
  Residential: 'Residentiel',
  Commercial: 'Commercial',
  'Mixed-Use': 'Usage mixte',
  Agricultural: 'Agricole',
  Featured: 'En vedette',
  New: 'Nouveau',
  Available: 'Disponible',
  Reserved: 'Reserve',
  Sold: 'Vendu',
  'For Sale': 'A vendre',
  'For Rent': 'A louer',
  Farming: 'Agriculture',
  Cultivation: 'Culture',
  Greenhouse: 'Serre',
  Agribusiness: 'Agrobusiness',
  Villa: 'Villa',
  Coastal: 'Cotier',
  Garden: 'Jardin',
  Pool: 'Piscine',
  Gated: 'Residence securisee',
  Executive: 'Executive',
  Hotel: 'Hotel',
  Seychelles: 'Seychelles',
  Beachfront: 'Bord de mer',
  Resort: 'Resort',
  'Eco Luxury': 'Eco-luxe',
  Development: 'Developpement',
  Investor: 'Investisseur',
  Villas: 'Villas',
  Wellness: 'Bien-etre',
  'Investment': 'Investissement',
  'Legal': 'Juridique',
  'Market Analysis': 'Analyse du marche',
  'Lifestyle': 'Style de vie',
  'Investment Analyst': 'Analyste investissement',
  'Legal Advisor': 'Conseiller juridique',
  'Market Research': 'Etudes de marche',
  'Founder & CEO': 'Fondateur et CEO',
  'Head of Sales': 'Responsable des ventes',
  'Investment Director': 'Directeur investissement',
  'Client Relations Manager': 'Responsable relation client',

  'Visit Us': 'Nous rendre visite',
  'Call Us': 'Appelez-nous',
  'Email Us': 'Ecrivez-nous',
  'Working Hours': 'Horaires',
  'Royal Road, Grand Baie': 'Royal Road, Grand Baie',
  'Mon - Fri: 9:00 AM - 6:00 PM': 'Lun - Ven: 9h00 - 18h00',
  'Sat: 10:00 AM - 2:00 PM': 'Sam: 10h00 - 14h00',

  Excellence: 'Excellence',
  'Global Reach': 'Portee internationale',
  'Client Focus': 'Priorite au client',
  'Market Expertise': 'Expertise du marche',
  'We maintain the highest standards in everything we do, from property selection to client service.':
    'Nous maintenons les plus hauts standards, de la selection des biens au service client.',
  'Our international network connects you to exclusive opportunities and buyers worldwide.':
    'Notre reseau international vous connecte a des opportunites exclusives et a des acheteurs dans le monde entier.',
  'Your success is our priority. We provide personalized service tailored to your unique needs.':
    'Votre succes est notre priorite. Nous offrons un service personnalise adapte a vos besoins.',
  'Deep local knowledge combined with global market insights for informed investment decisions.':
    'Une connaissance locale approfondie combinee a une vision globale du marche.',

  'Properties Sold': 'Proprietes vendues',
  'Total Investment Value': 'Valeur totale des investissements',
  'Happy Clients': 'Clients satisfaits',
  'Years of Excellence': "Annees d'excellence",

  'Prestigious Beachfront Estate Plot': 'Terrain prestigieux en bord de mer',
  'Hillside Panoramic View Estate': 'Domaine en hauteur avec vue panoramique',
  'Golf Course Premium Land': 'Terrain premium pres du parcours de golf',
  'Coastal Investment Parcel': 'Parcelle cotiere d’investissement',
  'Mountain Retreat Estate': 'Domaine de retraite en montagne',
  'Marina Development Site': 'Site de developpement en marina',
  'Exceptional beachfront plot with panoramic ocean views in an exclusive gated community.':
    'Terrain exceptionnel en bord de mer avec vue panoramique sur l’ocean dans une communaute securisee exclusive.',
  'Magnificent hillside plot with 360-degree mountain and ocean views.':
    'Magnifique terrain en hauteur avec vue a 360 degres sur la montagne et l’ocean.',
  'Prime land adjacent to championship golf course with resort amenities.':
    'Terrain de premier choix adjacent a un parcours de golf, avec services de resort.',
  'Expansive coastal land with exceptional development potential.':
    'Grand terrain cotier avec un potentiel de developpement exceptionnel.',
  'Magnificent mountain estate surrounded by tropical forests.':
    'Magnifique domaine de montagne entoure de forets tropicales.',
  'Prime marina-front development site with direct water access.':
    'Site de developpement premium en bord de marina avec acces direct a l’eau.',
  'Gated Community': 'Residence securisee',
  'Ocean Views': 'Vue mer',
  'Direct Beach Access': 'Acces direct a la plage',
  'Mountain Views': 'Vue montagne',
  'Elevated Position': 'Position surelevee',
  Privacy: 'Intimite',
  'Golf Course Frontage': 'Bordure de golf',
  'Resort Access': 'Acces resort',
  'Tropical Gardens': 'Jardins tropicaux',
  'Quiet Location': 'Emplacement calme',
  'Coastal Location': 'Emplacement cotier',
  'Development Potential': 'Potentiel de developpement',
  'Near Grand Baie': 'Pres de Grand Baie',
  'Ocean Proximity': 'Proximite de l’ocean',
  'Mountain Setting': 'Cadre montagneux',
  'Forest Views': 'Vue foret',
  'Waterfall Views': 'Vue cascade',
  'Large Plot': 'Grand terrain',
  'Marina Access': 'Acces marina',
  Waterfront: 'Bord de l’eau',
  'Development Ready': 'Pret a developper',
  'Central Location': 'Emplacement central',
  '24/7 Security': 'Securite 24/7',
  'Private Beach': 'Plage privee',
  'Tennis Courts': 'Courts de tennis',
  'Helipad Access': 'Acces heliport',
  'Underground Utilities': 'Reseaux souterrains',
  'Paved Roads': 'Routes asphaltees',
  'Security Patrol': 'Patrouille de securite',
  'Golf Club Membership': 'Adhesion au club de golf',
  'Spa Access': 'Acces spa',
  'Beach Club': 'Club de plage',
  Restaurant: 'Restaurant',
  'Public Beach Access': 'Acces plage publique',
  'Shopping Nearby': 'Commerces a proximite',
  Restaurants: 'Restaurants',
  'Natural Springs': 'Sources naturelles',
  'Hiking Trails': 'Sentiers de randonnee',
  'Nature Reserve': 'Reserve naturelle',
  'Marina Berths': 'Anneaux de marina',
  'Boat Launch': 'Rampe de mise a l’eau',
  'Fish Market': 'Marche aux poissons',

  'Irrigated Agricultural Estate': 'Domaine agricole irrigue',
  'Organic Farming Parcel': 'Parcelle agricole biologique',
  'Coastal Cultivation Land': 'Terrain de culture cotier',
  'Greenhouse Ready Farming Plot': 'Terrain agricole pret pour serre',
  'Large Scale Agribusiness Land': 'Grand terrain pour agrobusiness',
  'Mountain Edge Cultivation Estate': 'Domaine de culture en bordure de montagne',
  'From MUR 18M': 'A partir de 18M MUR',
  'From MUR 12M': 'A partir de 12M MUR',
  'From MUR 22M': 'A partir de 22M MUR',
  'From MUR 9M': 'A partir de 9M MUR',
  'From MUR 34M': 'A partir de 34M MUR',
  'From MUR 16M': 'A partir de 16M MUR',

  'Modern Family Villa for Rent': 'Villa familiale moderne a louer',
  'Coastal Townhouse Residence': 'Maison de ville cotiere',
  'Private Garden House': 'Maison avec jardin prive',
  'Luxury Pool Villa': 'Villa de luxe avec piscine',
  'Gated Community Home': 'Maison en residence securisee',
  'Executive City Residence': 'Residence executive en ville',
  '4 bedrooms': '4 chambres',
  '3 bedrooms': '3 chambres',
  '5 bedrooms': '5 chambres',
  'From MUR 95K/month': 'A partir de 95K MUR/mois',
  'From MUR 75K/month': 'A partir de 75K MUR/mois',
  'From MUR 68K/month': 'A partir de 68K MUR/mois',
  'From MUR 140K/month': 'A partir de 140K MUR/mois',
  'From MUR 82K/month': 'A partir de 82K MUR/mois',
  'From MUR 70K/month': 'A partir de 70K MUR/mois',

  'Boutique Resort Development Site': 'Site de developpement pour boutique resort',
  'Beachfront Hospitality Parcel': 'Parcelle hoteliere en bord de mer',
  'Eco-Luxury Hotel Concept': 'Concept hotelier eco-luxe',
  'Island View Resort Site': 'Site de resort avec vue sur l’ile',
  'Luxury Villas and Hotel Estate': 'Domaine hotelier avec villas de luxe',
  'Secluded Wellness Retreat Site': 'Site de retraite bien-etre isole',
  'Development opportunity': 'Opportunite de developpement',
  'Investor consultation': 'Consultation investisseur',
  'Partnership available': 'Partenariat disponible',
  '48 keys planned': '48 chambres prevues',
  '72 keys planned': '72 chambres prevues',
  'Beachfront site': 'Site en bord de mer',
  'Eco resort plan': 'Projet eco-resort',
  'Mixed hospitality plan': 'Projet hotelier mixte',
  'Wellness retreat plan': 'Projet de retraite bien-etre',

  'Why Mauritius is the Premier Destination for Land Investment in 2024':
    'Pourquoi Maurice est une destination de choix pour l’investissement foncier en 2024',
  'Understanding the IRS and PDS Schemes for Foreign Investors':
    'Comprendre les regimes IRS et PDS pour les investisseurs etrangers',
  'Top 5 Regions in Mauritius for Premium Land Acquisition':
    'Top 5 des regions a Maurice pour l’acquisition de terrains premium',
  'Discover why savvy investors are choosing Mauritius for their next land investment and what makes this island nation a hotspot for premium real estate.':
    'Decouvrez pourquoi les investisseurs avertis choisissent Maurice pour leur prochain investissement foncier.',
  'A comprehensive guide to the Integrated Resort Scheme (IRS) and Property Development Scheme (PDS) for international buyers looking to invest in Mauritius.':
    'Un guide complet des regimes IRS et PDS pour les acheteurs internationaux souhaitant investir a Maurice.',
  'Explore the most prestigious regions in Mauritius offering exceptional land investment opportunities with high growth potential.':
    'Explorez les regions les plus prestigieuses de Maurice, offrant des opportunites foncieres a fort potentiel.',
  Mauritius: 'Maurice',
  'Black River (Rivière Noire)': 'Riviere Noire (Black River)',
  'Port Louis (the capital city)': 'Port-Louis (la capitale)',
  'Real Estate': 'Immobilier',
  '2024 Trends': 'Tendances 2024',
  'Foreign Investment': 'Investissement etranger',
  'Legal Guide': 'Guide juridique',
  Regions: 'Regions',
  'Investment Zones': "Zones d'investissement",
  'With over 20 years in luxury real estate, Alexandre founded Vestate to bring world-class investment opportunities to discerning clients.':
    "Avec plus de 20 ans d'experience dans l'immobilier de luxe, Alexandre a fonde Vestate pour proposer des opportunites d'investissement de haut niveau.",
  'Marie-Claire brings exceptional expertise in high-value land transactions and has facilitated over $200M in successful deals.':
    "Marie-Claire apporte une expertise solide dans les transactions foncieres haut de gamme et a accompagne plus de 200M USD de ventes.",
  'Jean-Pierre specializes in identifying premium investment opportunities and advising international clients on portfolio diversification.':
    "Jean-Pierre identifie les opportunites d'investissement premium et conseille les clients internationaux sur la diversification de portefeuille.",
  'Isabella ensures every client receives personalized attention and a seamless experience throughout their investment journey.':
    "Isabella veille a offrir un accompagnement personnalise et une experience fluide a chaque client.",
  'An exceptional beachfront plot offering unparalleled views of the Indian Ocean. This premium land parcel is ideally positioned within an exclusive gated community, featuring direct beach access and world-class amenities. Perfect for building your dream luxury residence or as a prestigious investment opportunity.':
    "Un terrain exceptionnel en bord de mer avec une vue remarquable sur l'ocean Indien. Situe dans une residence exclusive et securisee, il offre un acces direct a la plage et des commodites haut de gamme.",
  'Nestled in the prestigious hills of Tamarin, this magnificent plot offers breathtaking 360-degree views of the mountains and ocean. The elevated position ensures privacy while providing spectacular sunsets over the Tamarin Bay.':
    'Situe dans les collines recherchees de Tamarin, ce terrain offre une vue a 360 degres sur la montagne et la mer, avec une position surelevee et intime.',
  'A rare opportunity to acquire prime land adjacent to a championship golf course in the prestigious Bel Ombre estate. This exclusive plot offers serene surroundings, lush tropical landscaping, and access to world-class resort amenities.':
    "Une occasion rare d'acquerir un terrain de choix pres d'un parcours de golf prestigieux a Bel Ombre, dans un cadre calme avec acces aux services du resort.",
  'Prime coastal land in the sought-after Pointe aux Canonniers area. This expansive plot offers exceptional development potential with stunning ocean views and proximity to Grand Baie amenities.':
    'Terrain cotier de premier choix a Pointe aux Canonniers, avec un fort potentiel de developpement, vue mer et proximite des commodites de Grand Baie.',
  'Escape to paradise with this magnificent mountain estate in Chamarel. Surrounded by lush tropical forests and offering views of the famous Chamarel waterfalls, this is the perfect retreat from urban life.':
    'Un magnifique domaine de montagne a Chamarel, entoure de forets tropicales et avec vue sur les cascades, ideal pour une retraite au calme.',
  'Exceptional waterfront development opportunity in Black River. This prime marina-front site offers unmatched potential for luxury residential or boutique hotel development with direct water access.':
    "Une opportunite de developpement exceptionnelle a Riviere Noire, en bord de marina, ideale pour un projet residentiel de luxe ou hotelier avec acces direct a l'eau.",
  '15% annual appreciation': '15 % de valorisation annuelle',
  'Foreign ownership allowed': 'Propriete etrangere autorisee',
  'IRS Scheme eligible': 'Eligible au regime IRS',
  'Rental income potential': 'Potentiel de revenus locatifs',
  '12% annual appreciation': '12 % de valorisation annuelle',
  'Prime location': 'Emplacement premium',
  'Limited availability': 'Disponibilite limitee',
  'PDS Scheme eligible': 'Eligible au regime PDS',
  'Stable appreciation': 'Valorisation stable',
  'Resort community': 'Communaute de resort',
  'High rental demand': 'Forte demande locative',
  'IRS eligible': 'Eligible IRS',
  'High development value': 'Forte valeur de developpement',
  '18% ROI potential': 'Potentiel de ROI de 18 %',
  'Growing area': 'Zone en croissance',
  'Tourist hotspot': 'Zone touristique prisee',
  'Eco-tourism potential': 'Potentiel eco-touristique',
  'Unique location': 'Emplacement unique',
  'Agricultural rights': 'Droits agricoles',
  'Growing eco-market': 'Marche eco en croissance',
  'Development permit ready': 'Permis de developpement pret',
  'High-value location': 'Emplacement de forte valeur',
  'Tourism growth': 'Croissance touristique',
  'Unique opportunity': 'Opportunite unique',
}

type TranslationKey = keyof typeof translations.en

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  currency: Currency
  currencyOptions: typeof currencyOptions
  setCurrency: (currency: Currency) => void
  formatCurrency: (priceMur: number) => string
  formatCompactCurrency: (priceMur: number) => string
  t: (key: TranslationKey) => string
  tr: (text: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLanguage() {
  try {
    const storedLanguage = window.localStorage.getItem('vestate-language')
    return storedLanguage === 'en' || storedLanguage === 'fr' ? storedLanguage : null
  } catch {
    return null
  }
}

function persistLanguage(language: Language) {
  try {
    window.localStorage.setItem('vestate-language', language)
  } catch {
    // Cookies still keep the selection across server renders if localStorage is unavailable.
  }

  document.cookie = `vestate-language=${language}; Path=/; Max-Age=31536000; SameSite=Lax`
  document.documentElement.lang = language
}

function readStoredCurrency() {
  try {
    const storedCurrency = window.localStorage.getItem('vestate-currency')
    return currencyOptions.includes(storedCurrency as Currency)
      ? (storedCurrency as Currency)
      : null
  } catch {
    return null
  }
}

function persistCurrency(currency: Currency) {
  try {
    window.localStorage.setItem('vestate-currency', currency)
  } catch {
    // The selection can still be used for this session if localStorage is unavailable.
  }
}

function convertFromMur(priceMur: number, currency: Currency) {
  return priceMur * currencyConfig[currency].rateFromMur
}

function formatCurrencyValue(priceMur: number, currency: Currency) {
  const convertedPrice = convertFromMur(priceMur, currency)

  return new Intl.NumberFormat(currencyConfig[currency].locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: convertedPrice >= 100 ? 0 : 2,
  }).format(convertedPrice)
}

function formatCompactCurrencyValue(priceMur: number, currency: Currency) {
  const convertedPrice = convertFromMur(priceMur, currency)
  const compactValue =
    convertedPrice >= 1000000
      ? `${(convertedPrice / 1000000).toFixed(1)}M`
      : convertedPrice >= 1000
        ? `${Math.round(convertedPrice / 1000)}K`
        : Math.round(convertedPrice).toLocaleString(currencyConfig[currency].locale)

  return `${currency} ${compactValue}`
}

export function LanguageProvider({
  children,
  initialLanguage = 'en',
  hasLanguageCookie = false,
}: {
  children: ReactNode
  initialLanguage?: Language
  hasLanguageCookie?: boolean
}) {
  const router = useRouter()
  const userSelectedLanguage = useRef(false)
  const [language, setLanguageState] = useState<Language>(initialLanguage)
  const [currency, setCurrencyState] = useState<Currency>('MUR')

  useEffect(() => {
    if (userSelectedLanguage.current) return

    const storedLanguage = readStoredLanguage()
    const nextLanguage = hasLanguageCookie ? initialLanguage : storedLanguage || initialLanguage

    setLanguageState(nextLanguage)
    persistLanguage(nextLanguage)
  }, [hasLanguageCookie, initialLanguage])

  const setLanguage = useCallback((nextLanguage: Language) => {
    userSelectedLanguage.current = true
    setLanguageState(nextLanguage)
    persistLanguage(nextLanguage)
    router.refresh()
  }, [router])

  useEffect(() => {
    const storedCurrency = readStoredCurrency()
    if (storedCurrency) {
      setCurrencyState(storedCurrency)
    }
  }, [])

  const setCurrency = useCallback((nextCurrency: Currency) => {
    setCurrencyState(nextCurrency)
    persistCurrency(nextCurrency)
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      currency,
      currencyOptions,
      setCurrency,
      formatCurrency: (priceMur) => formatCurrencyValue(priceMur, currency),
      formatCompactCurrency: (priceMur) => formatCompactCurrencyValue(priceMur, currency),
      t: (key) => translations[language][key] || translations.en[key],
      tr: (text) => (language === 'fr' ? frPhrases[text] || text : text),
    }),
    [currency, language, setCurrency, setLanguage]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
