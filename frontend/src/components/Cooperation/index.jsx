import { Box, Heading } from '@chakra-ui/react';
import './index.css'
import { useTranslation } from 'react-i18next';

const Cooperation = () => {
  const { t } = useTranslation();

  return (
    <Box className='cooperationBlock'>
        <Heading
          className='blockTitle'
          fontSize={["42px", "48px"]}
          lineHeight={["51px", "58px"]}
        >{t('HomePage.cooperation')}?</Heading>
        <div className='emailContainer'>
            <span>anumoplastic@gmail.com</span>
        </div>
    </Box>
  );
};

export default Cooperation;