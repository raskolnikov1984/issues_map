export interface DemoCaseSeed {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export const DEMO_CASES: DemoCaseSeed[] = [
  {
    id: '7f6c1a2e-3b4d-4e5f-8a90-1b2c3d4e5f60',
    title: 'Flood report',
    description:
      'Blocked street downtown due to heavy rain overflow near Junin street.',
    latitude: 6.2518,
    longitude: -75.5636,
    createdAt: '2026-08-20T12:00:00.000Z',
  },
  {
    id: '2c9d8e7f-1a2b-4c3d-9e4f-5a6b7c8d9e01',
    title: 'Pothole damage',
    description:
      'Large dangerous pothole affecting traffic flow on El Poblado Avenue.',
    latitude: 6.2088,
    longitude: -75.567,
    createdAt: '2026-08-20T13:00:00.000Z',
  },
  {
    id: 'f1e2d3c4-b5a6-4778-8a9b-0c1d2e3f4a51',
    title: 'Traffic light failure',
    description:
      'Intersection lights out of service causing major congestion near Nutibara Avenue.',
    latitude: 6.2447,
    longitude: -75.5902,
    createdAt: '2026-08-20T14:00:00.000Z',
  },
  {
    id: '9a8b7c6d-5e4f-4321-9876-fedcba987654',
    title: 'Fallen tree',
    description:
      'A eucalyptus branch fell blocking one lane on Las Palmas road.',
    latitude: 6.2301,
    longitude: -75.5562,
    createdAt: '2026-08-20T15:00:00.000Z',
  },
  {
    id: '12345678-abcd-4ef0-a123-456789abcdef',
    title: 'Water leak',
    description: 'Main pipe rupture wasting clean water outside Laureles park.',
    latitude: 6.2431,
    longitude: -75.5935,
    createdAt: '2026-08-20T16:00:00.000Z',
  },
  {
    id: 'deadbeef-cafe-4bad-b00b-1234567890ab',
    title: 'Illegal dumping',
    description:
      'Accumulation of construction debris and furniture blocking pedestrian walkway.',
    latitude: 6.2672,
    longitude: -75.5684,
    createdAt: '2026-08-20T17:00:00.000Z',
  },
  {
    id: '0f1e2d3c-4b5a-4968-8776-554433221100',
    title: 'Street light outage',
    description:
      'Multiple consecutive lamps failing along the river highway bike path.',
    latitude: 6.2821,
    longitude: -75.5723,
    createdAt: '2026-08-20T18:00:00.000Z',
  },
  {
    id: 'abcdef01-2345-4678-9abc-def012345678',
    title: 'Manhole cover missing',
    description:
      'Open drainage pit without protection posing a serious risk to pedestrians.',
    latitude: 6.2361,
    longitude: -75.5752,
    createdAt: '2026-08-20T19:00:00.000Z',
  },
  {
    id: '55555555-6666-4777-8888-999900001111',
    title: 'Landslide warning',
    description:
      'Minor soil displacement and mudslide risk near the hillside of San Javier.',
    latitude: 6.2533,
    longitude: -75.6111,
    createdAt: '2026-08-20T20:00:00.000Z',
  },
  {
    id: 'aaaa0000-bbbb-4ccc-8ddd-eeeeffff0001',
    title: 'Public infrastructure damage',
    description:
      'Vandalized bus stop shelter glass shattered at Estadio station area.',
    latitude: 6.2568,
    longitude: -75.5879,
    createdAt: '2026-08-20T21:00:00.000Z',
  },
  {
    id: '11223344-5566-4778-899a-bbccddeeff01',
    title: 'Road subsidence',
    description:
      'Sinking asphalt layer creating a hazard for motorcyclists in Belen.',
    latitude: 6.2239,
    longitude: -75.6045,
    createdAt: '2026-08-20T22:00:00.000Z',
  },
  {
    id: 'ffeeddcc-bbaa-4998-8776-665544332211',
    title: 'Blocked storm drain',
    description:
      'Leaves and garbage clogging the drainage system causing localized pooling.',
    latitude: 6.2709,
    longitude: -75.5581,
    createdAt: '2026-08-20T23:00:00.000Z',
  },
  {
    id: '98765432-10fe-4dc8-a987-654321fedcba',
    title: 'Power line hazard',
    description:
      'Low hanging electrical cables following a short circuit near Boston neighborhood.',
    latitude: 6.2485,
    longitude: -75.5559,
    createdAt: '2026-08-21T00:00:00.000Z',
  },
  {
    id: 'c0ffee00-d00d-4bea-8def-ec7edface123',
    title: 'Accident aftermath',
    description:
      'Debris and oil spill on the road following a minor collision at 33rd street.',
    latitude: 6.2384,
    longitude: -75.5841,
    createdAt: '2026-08-21T01:00:00.000Z',
  },
  {
    id: '01010101-0202-4303-8404-550505050606',
    title: 'Sidewalk obstruction',
    description:
      'Broken concrete slabs making the pathway impassable for wheelchairs.',
    latitude: 6.2165,
    longitude: -75.5732,
    createdAt: '2026-08-21T02:00:00.000Z',
  },
  {
    id: '77aaaa77-bbbb-4ccc-8ddd-e00000000001',
    title: 'Illegal parking hazard',
    description:
      'Vehicles blocking the emergency evacuation corridor in Provenza.',
    latitude: 6.2099,
    longitude: -75.5651,
    createdAt: '2026-08-21T03:00:00.000Z',
  },
  {
    id: '2468ace0-1357-4bdf-9246-80ce2468ace1',
    title: 'Stray animals alert',
    description:
      'Pack of unattended dogs causing disruption near Jardín Botánico.',
    latitude: 6.2715,
    longitude: -75.5658,
    createdAt: '2026-08-21T04:00:00.000Z',
  },
  {
    id: 'b16c00b5-c0de-4fea-8ba5-000000ba5eba',
    title: 'Broken traffic sign',
    description:
      'Stop sign knocked down and hidden behind vegetation in Floresta.',
    latitude: 6.2541,
    longitude: -75.5978,
    createdAt: '2026-08-21T05:00:00.000Z',
  },
  {
    id: 'cafebabe-0000-4f1e-8d00-000000000019',
    title: 'Open sewer odor',
    description:
      'Strong sewage gas emissions coming from a damaged junction box.',
    latitude: 6.2602,
    longitude: -75.5543,
    createdAt: '2026-08-21T06:00:00.000Z',
  },
  {
    id: 'd15ea5ed-c0ff-4eee-8001-000000000020',
    title: 'Bridge joint failure',
    description:
      'Metallic expansion joint making loud rattling noises and damaging vehicle tires.',
    latitude: 6.2198,
    longitude: -75.5789,
    createdAt: '2026-08-21T07:00:00.000Z',
  },
];
