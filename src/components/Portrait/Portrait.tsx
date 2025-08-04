import { Box, Typography, type SxProps, type Theme } from '@mui/material';

interface PortraitProps {
  src: string;
  alt: string;
  label?: string;
  sx?: SxProps<Theme>;
}

function Portrait({ src, alt, label, sx }: PortraitProps) {
  return (
    <Box
      sx={[
        {
          display: 'grid',
          placeItems: 'center',
          width: 120,
          height: '100%',
          overflow: 'hidden',
          borderRadius: 2,
          transition: '0.2s',
          '&:hover': {
            transform: 'scale(1.03)',
          },
        },
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          gridArea: '1 / 1',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
      <Box
        sx={{
          gridArea: '1 / 1',
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(0deg,rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)',
          zIndex: 1,
        }}
      />
      {label && (
        <Typography
          variant="subtitle2"
          sx={{
            gridArea: '1 / 1',
            color: 'white',
            fontWeight: 'bold',
            alignSelf: 'end',
            justifySelf: 'center',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}

export default Portrait;
