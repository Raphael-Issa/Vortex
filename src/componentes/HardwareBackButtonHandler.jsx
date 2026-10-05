import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

export function HardwareBackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Adiciona o listener para o botão de voltar físico do Android
    const backButtonListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      // Se estamos na tela inicial, o botão de voltar fecha o app
      if (location.pathname === '/') {
        CapacitorApp.exitApp();
      } else {
        // Caso contrário, volta uma página na navegação do React Router
        navigate(-1);
      }
    });

    // Limpa o listener quando o componente desmontar
    return () => {
      backButtonListener.then(listener => listener.remove());
    };
  }, [navigate, location]);

  return null; // Este componente não renderiza nada na tela
}
