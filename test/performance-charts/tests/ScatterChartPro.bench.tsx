import * as React from 'react';
// eslint-disable-next-line no-restricted-imports
import { render, cleanup } from '@testing-library/react';
import { bench, describe } from 'vitest';
import { ScatterChartPro } from '@mui/x-charts-pro/ScatterChartPro';
import { LicenseInfo, generateLicense } from '@mui/x-license';
import { options } from '../utils/options';

describe('ScatterChartPro', () => {
  const dataLength = 50;
  const data = Array.from({ length: dataLength }).map((_, i) => ({
    x: i,
    y: 50 + Math.sin(i / 5) * 25,
  }));

  const xData = data.map((d) => d.x);

  bench(
    'ScatterChartPro with big data amount',
    async () => {
      const licenseKey = generateLicense({
        expiryDate: new Date(3001, 0, 0, 0, 0, 0, 0),
        orderNumber: 'MUI-123',
        planScope: 'pro',
        licenseModel: 'subscription',
        planVersion: 'Q3-2024',
      });

      LicenseInfo.setLicenseKey(licenseKey);

      const { findByText } = render(
        <ScatterChartPro
          xAxis={[
            {
              id: 'x',
              data: xData,
              zoom: { filterMode: 'discard' },
              valueFormatter: (v) => v.toLocaleString('en-US'),
            },
          ]}
          initialZoom={[{ axisId: 'x', start: 20, end: 70 }]}
          series={[
            {
              data,
            },
          ]}
          width={500}
          height={300}
        />,
      );

      await findByText('60', { ignore: 'span' });

      cleanup();
    },
    options,
  );
});
