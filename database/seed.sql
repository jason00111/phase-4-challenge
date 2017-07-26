INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (name, email, password)
VALUES
  ('garfield', 'garfield@gmail.com', '$2a$10$Onn4LIw/zRjsiSOS5EvIieu5.dBbNYLJcMGCtWpCTMgf6kuZRiDye'),
  ('odie', 'odie@gmail.com', '$2a$10$qqbrEVsEpqhpzBy1J7Vb/.Z3tXM7H0Lz.ut1irap8qwhdhMTLCALi')
;

INSERT INTO
  reviews (user_id, album_id, created, review)
VALUES
  (1, 1, '2017-07-25', 'For its lyrical and musical scope, Malibu brings to mind a number of excellent albums, ranging from Stevie Wonder’s Innervisions to, yes, Kendrick Lamar’s To Pimp a Butterfly.'),
  (2, 1, '2017-07-24', 'Paak’s got a musicality that could likely place him in the category of genius. Scope and influence are on display and while wide-ranging, never give the album a sense of attention-deficit disorder: it all flows like a single thought.'),
  (1, 4, '2017-07-23', 'Radiohead is, to put it simply, way past their time. Stop making music for God’s sake. Your done.'),
  (2, 4, '2017-07-22', 'The most heartening thing about In Rainbows, besides the fact that it may represent the strongest collection of songs Radiohead have assembled for a decade, is that it ventures into new emotional territories.')
;
