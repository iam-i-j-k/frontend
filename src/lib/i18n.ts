import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome back!",
      "description": "Here's your personalized content digest for today. We've curated the best news, movies, and posts based on your interests.",
      "feed_title": "Your Feed",
      "feed_subtitle": "Drag to reorder your personalized content",
      "trending": "Trending Now",
      "trending_subtitle": "The most popular content across the platform",
      "favorites": "Your Favorites",
      "favorites_subtitle": "Content you've saved for later",
      "settings": "Preferences",
      "settings_subtitle": "Customize your personalized feed experience",
      "search_placeholder": "Search news, movies, posts...",
      "read_more": "Read More",
      "play_now": "Play Now",
      "no_content": "No content matches your criteria.",
      "loading": "Curating your personalized feed...",
      "upgrade_pro": "Upgrade to Pro",
      "upgrade_desc": "Get unlimited feeds and custom sources.",
      "learn_more": "Learn More",
      "my_feed": "My Feed",
      "login": "Login",
      "logout": "Logout",
    }
  },
  es: {
    translation: {
      "welcome": "¡Bienvenido de nuevo!",
      "description": "Aquí tienes tu resumen de contenido personalizado de hoy. Hemos seleccionado las mejores noticias, películas y publicaciones según tus intereses.",
      "feed_title": "Tu Feed",
      "feed_subtitle": "Arrastra para reordenar tu contenido",
      "trending": "Tendencias",
      "trending_subtitle": "El contenido más popular en la plataforma",
      "favorites": "Tus Favoritos",
      "favorites_subtitle": "Contenido guardado para más tarde",
      "settings": "Preferencias",
      "settings_subtitle": "Personaliza tu experiencia",
      "search_placeholder": "Buscar noticias, películas...",
      "read_more": "Leer más",
      "play_now": "Reproducir ahora",
      "no_content": "No hay contenido que coincida.",
      "loading": "Preparando tu feed...",
      "upgrade_pro": "Mejora a Pro",
      "upgrade_desc": "Fuentes ilimitadas y personalizadas.",
      "learn_more": "Saber más",
      "my_feed": "Mi Feed",
      "login": "Iniciar Sesión",
      "logout": "Cerrar Sesión",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
