-- Add more sample photos to previous activities for testing
UPDATE previous_activities 
SET photos = ARRAY[
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400',
  'https://images.unsplash.com/photo-1573164713712-03790a178651?w=400',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400'
]
WHERE photos IS NULL OR array_length(photos, 1) < 4;