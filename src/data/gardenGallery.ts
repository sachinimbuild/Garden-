export type GalleryCategory = 'all' | 'flora' | 'grounds';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'all'>;
  categoryLabel: string;
  botanicalNote: string;
}

export const GALLERY_CATEGORIES: {id: GalleryCategory; label: string}[] = [
  {id: 'all', label: 'All Photos'},
  {id: 'flora', label: 'Medicinal Flora'},
  {id: 'grounds', label: 'Garden & Visits'},
];

export const GARDEN_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'murutha-blossom',
    src: '/assets/aistudio/IMG_4545_a0932633.JPG',
    title: 'Murutha (Queen’s Crape Myrtle) Blossom',
    caption:
      'Vibrant ruffled purple Lagerstroemia speciosa petals with golden stamens attracting native garden pollinators.',
    category: 'flora',
    categoryLabel: 'Medicinal Flora',
    botanicalNote: 'Lagerstroemia speciosa · Ganewaththa',
  },
  {
    id: 'garden-lawn-canopy',
    src: '/assets/aistudio/PXL_20251024_071233604_b15b896b.jpg',
    title: 'Main Garden Lawn & Shade Trees',
    caption:
      'Expansive green lawn bordered by mature medicinal trees, manicured hedgerows, stone outcrops, and quiet resting benches.',
    category: 'grounds',
    categoryLabel: 'Garden & Visits',
    botanicalNote: 'Central Lawn · Ganewaththa',
  },
  {
    id: 'educational-garden-visit',
    src: '/assets/aistudio/IMG_5069_60ac371c.JPG',
    title: 'Educational Tour & Student Visit',
    caption:
      'Young students discovering fresh medicinal fruits and learning about native plants during a guided tour on the garden lawn.',
    category: 'grounds',
    categoryLabel: 'Garden & Visits',
    botanicalNote: 'Guided Learning · Open Grounds',
  },
  {
    id: 'purple-solanum-flower',
    src: '/assets/aistudio/PXL_20260810_073501619_fa963178.jpeg',
    title: 'Violet Star Medicinal Blossom',
    caption:
      'Five-petaled violet Solanum flower with bright yellow anthers blooming in warm natural sunlight along the garden beds.',
    category: 'flora',
    categoryLabel: 'Medicinal Flora',
    botanicalNote: 'Solanaceae Specimen · Sunlit Bed',
  },
  {
    id: 'cream-blossom-cluster',
    src: '/assets/aistudio/PXL_20260812_035915166_67ab3821.jpeg',
    title: 'Cream Flower Cluster & Foliage',
    caption:
      'Delicate clusters of small white-and-cream medicinal blossoms emerging alongside fresh green leaves on a young branch.',
    category: 'flora',
    categoryLabel: 'Medicinal Flora',
    botanicalNote: 'Flowering Branch · Ganewaththa',
  },
  {
    id: 'flowering-specimen-branch',
    src: '/assets/aistudio/IMG_5057_8cf1d4cc.JPG',
    title: 'Flowering Botanical Specimen',
    caption:
      'Close-up of slender white medicinal tree blossoms and developing green seed pods along a sunlit canopy branch.',
    category: 'flora',
    categoryLabel: 'Medicinal Flora',
    botanicalNote: 'Canopy Flora · Blossom Stage',
  },
];
