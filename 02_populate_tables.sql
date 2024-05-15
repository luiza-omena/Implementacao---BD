use grifo;

INSERT INTO Telefone_cliente (telefone) 
VALUES 
	('555-123-4567'),
    ('555-987-6543'),
    ('555-555-5555');

INSERT INTO Cliente (nome, email, fk_telefone_pk, estado, rua, bairro, cidade, numero)
VALUES
  ('Luiza Omena', 'luizaomena@gmail.com', 1, 'Pernambuco', 'Estrada Real do Poço', 'Poço da Panela', 'Recife', 123),
  ('Nathália Accioly', 'nathaccioly@gmail.com', 2, 'Pernambuco', 'Rua Manoel de Carvalho', 'Aflitos', 'Recife', 456),
  ('Alycia Lima', 'alycialima@gmail.com', 3, 'Pernambuco', 'Avenida Boa Viagem', 'Boa Viagem', 'Recife', 789);

INSERT INTO Orcamento (valor, prazo_entrega, fk_Cliente_id_cliente)
VALUES 
    (1000.00, '2023-01-15', 1),
    (1500.50, '2023-02-20', 2),
    (800.75, '2023-03-10', 3),
    (6600.00, '2023-05-15', 1),
    (1500.50, '2023-02-20', 2),
    (800.75, '2023-03-10', 3),   
    (6600.00, '2023-05-20', 1),
    (1500.50, '2023-02-20', 2),
    (800.75, '2023-03-10', 3),
    (5000.00, '2023-07-15', 1),
    (1500.50, '2023-02-20', 2),
    (800.75, '2023-03-10', 2),
    (6800.00, '2023-05-15', 3),
    (1500.50, '2023-02-24', 1),
    (800.50, '2023-03-10', 1);

INSERT INTO Telefone_funcionario (telefone) 
VALUES
    ('123-456-7890'),
    ('987-654-3210'),
    ('555-555-5555'),
    ('999-888-7775'),
    ('101-222-3333'),
    ('444-333-2522'),
    ('777-777-3077'),
    ('666-100-6666'),
    ('888-888-8876'),
    ('123-987-6543'),
    ('555-555-5595'),
    ('999-878-4077'),
    ('191-222-3333'),
    ('404-333-2222'),
    ('777-777-5077'),
    ('666-200-6666'),
    ('888-888-8288'),
    ('123-407-6543'),
    ('555-555-5855'),
    ('999-858-7777'),
    ('110-222-3333'),
    ('474-333-2222'),
    ('777-777-7777'),
    ('666-300-6666'),
    ('888-888-8788'),
    ('123-967-6543'),
    ('555-555-5655'),
    ('949-888-7777'),
    ('119-222-3333'),
    ('494-333-2222'),
    ('777-147-7777'),
    ('666-400-6666'),
    ('888-888-8988'),
    ('123-997-6543'),
    ('555-565-5555'),
    ('939-888-7777'),
    ('181-222-3333'),
    ('444-323-2222'),
    ('787-267-7777'),
    ('666-500-6666'),
    ('828-888-8888'),
    ('123-987-6943');

INSERT INTO Funcionario (nome, email, fk_telefone_pk, estado, rua, bairro, cidade, numero, salario) 
VALUES
    -- auto relacionamento
    ('Pérside Omena Ribeiro', 'persideomena@grifo.com', 1, 'Pernambuco', 'Estrada Real do Poço', 'Poço da Panela', 'Recife', 123, 2500.00),
    -- administrativo
    ('Beatriz Omena Pedrosa', 'beatrizomena@grifo.com', 2, 'Pernambuco', 'Avenida Domingos Ferreira', 'Boa Viagem', 'Recife', 456, 2800.50),
    ('Ednólia Viana de Lima', 'ednolialima@grifo.com', 3, 'Pernambuco', 'Rua Edson Álvares', 'Casa Forte', 'Recife', 789, 3000.75),
    ('Patrícia Alves de Souza', 'patriciasouza@grifo.com', 4, 'Pernambuco', 'Rua Manuel de Medeiros', 'Dois Irmãos', 'Recife', 101, 2700.25),
    ('Luiz Augusto Borges da Silva', 'luizsilva@grifo.com', 5, 'Pernambuco', 'Rua dos Navegantes', 'Boa Viagem', 'Recife', 111, 3200.90),
    ('Ana Celília Ribeiro Omena', 'anaomena@grifo.com', 6, 'Pernambuco', 'Rua Joaquim Antônio de Medeiros', 'Casa Caiada', 'Olinda', 333, 2600.60),
    ('Claúdia Célia Tosta Lima', 'claudialima@grifo.com', 7, 'Pernambuco', 'Rua Manuel de Medeiros', 'Dois Irmãos', 'Recife', 555, 2800.40),
    ('Renato Júnior da Silva', 'renatosilva@grifo.com', 8, 'Pernambuco', 'Rua do Chacon', 'Poço da Panela', 'Recife', 666, 3400.00),
    -- restauradores
    ('Adriano Max B. Silva', 'adrianosilva@grifo.com', 9, 'Pernambuco', 'Rua Oliveira Góes', 'Poço da Panela', 'Recife', 125, 3400.00),
    ('Alexsandra Sebastião', 'alexandra@grifo.com', 10, 'Pernambuco', 'Rua Oliveira Góes', 'Poço da Panela', 'Recife', 53, 3400.00),
    ('Ana Maria de Castro Baião Brumano', 'anabrumano@grifo.com', 11, 'Pernambuco', 'Rua Oliveira Góes', 'Poço da Panela', 'Recife', 360, 3400.00),
    ('Ângela Maria dos Santos', 'angelasantos@grifo.com', 12, 'Pernambuco', 'Rua do Chacon', 'Poço da Panela', 'Recife', 272, 3400.00),
    ('Antônio Cabral de Farias Filho', 'antoniofarias@grifo.com', 13, 'Pernambuco', 'Rua Antônio Falcão', 'Boa Viagem', 'Recife', 57, 3400.00),
    ('Bárbara Sheyla Pereira Lopes da Silva', 'barbarasilva@grifo.com', 14, 'Pernambuco', 'Rua dos Navegantes', 'Boa Viagem', 'Recife', 204, 3400.00),
    ('Carla Marcelina dos Santos Arruda', 'carlaarruda@grifo.com', 15, 'Pernambuco', 'Avenida Domingos Ferreira', 'Boa Viagem', 'Recife', 666, 3400.00),
    ('Cleisson Correia Diogo', 'cleissondiogo@grifo.com', 16, 'Pernambuco', 'Avenida Domingos Ferreira', 'Boa Viagem', 'Recife', 63, 3400.00),
    ('Cristina Lucia Bezerra de Oliveira', 'cristinaoliveira@grifo.com', 17, 'Pernambuco', 'Rua Antônio Falcão', 'Boa Viagem', 'Recife', 228, 3400.00),
    ('Diego Moraes Silva', 'diegomoraes@grifo.com', 18, 'Pernambuco', 'Avenida Domingos Ferreira', 'Boa Viagem', 'Recife', 29, 3400.00),
    ('Dierlâne da Silva Araújo', 'dierlanearaujo@grifo.com', 19, 'Pernambuco', 'Rua dos Navegantes', 'Boa Viagem', 'Recife', 45, 3400.00),
    ('Djalma Marques da Silva', 'djalmasilva@grifo.com', 20, 'Pernambuco', 'Rua Antônio Falcão', 'Boa Viagem', 'Recife', 66, 3400.00),
    ('Edson Freitas dos Santos', 'edsonsantos@grifo.com', 21, 'Pernambuco', 'Avenida Domingos Ferreira', 'Boa Viagem', 'Recife', 68, 3400.00),
    ('Enos Omena Ribeiro', 'enosribeiro@grifo.com', 22, 'Pernambuco', 'Rua Conselheiro Nabuco', 'Casa Amarela', 'Recife', 67, 3400.00),
    ('Eraldo Omena Ribeiro', 'eraldoomena@grifo.com', 23, 'Pernambuco', 'Rua Doutor Genaro Guimarães', 'Casa Amarela', 'Recife', 678, 3400.00),
    ('Éric Moreira Guimarães', 'ericamoreira@grifo.com', 24, 'Pernambuco', 'Rua Doutor Genaro Guimarães', 'Casa Amarela', 'Recife', 254, 3400.00),
    ('Érica Maria Ferreira da Silva', 'ericasilva@grifo.com', 25, 'Pernambuco', 'Rua Doutor Genaro Guimarães', 'Casa Amarela', 'Recife', 232, 3400.00),
    ('Fabíola Maria Santos da Silva', 'fabiolasilva@grifo.com', 26, 'Pernambuco', 'Rua Desembargador Motta Júnior', 'Casa Amarela', 'Recife', 256, 3400.00),
    ('Flávio Roberto de Araújo Carvalho', 'flaviocarvalho@grifo.com', 27, 'Pernambuco', 'Rua Conselheiro Nabuco', 'Casa Amarela', 'Recife', 58, 3400.00),
    ('Francisca Edilene da Silva Souza', 'franciscasouza@grifo.com', 28, 'Pernambuco', 'Rua Desembargador Motta Júnior', 'Casa Amarela', 'Recife', 89, 3400.00),
    ('Geraldo José de Moura', 'geraldomoura@grifo.com', 29, 'Pernambuco', 'Rua Desembargador Motta Júnior', 'Casa Amarela', 'Recife', 124, 3400.00),
    ('Gilbert Lucas Chagas', 'gilbertchagas@grifo.com', 30, 'Pernambuco', 'Rua Conselheiro Nabuco', 'Casa Amarela', 'Recife', 127, 3400.00),
    ('Gilmar Crisóstomo da Silva', 'gilmarsilva@grifo.com', 31, 'Pernambuco', 'Rua Edson Álvares', 'Casa Forte', 'Recife', 78, 3400.00),
    ('Gleice Barbosa da Silva', 'gleicesilva@grifo.com', 32, 'Pernambuco', 'Rua Edson Álvares', 'Casa Forte', 'Recife', 89, 3400.00),
    ('Gleisiana Maria Machado Lins', 'gleisianalins@grifo.com', 33, 'Pernambuco', 'Rua Edson Álvares', 'Casa Forte', 'Recife', 90, 3400.00),
    ('Laudijane Rodrigues da Silva', 'laudjanesilva@grifo.com', 34, 'Pernambuco', 'Rua Vicente de Barros Barreiros', 'Casa Caiada', 'Olinda', 689, 3400.00),
    ('Luiz Carlos dos Santos Júnior', 'luizsantos@grifo.com', 35, 'Pernambuco', 'Rua Vicente de Barros Barreiros', 'Casa Caiada', 'Olinda', 06, 3400.00),
    ('Manoel Paulo de Oliveira', 'manoeloliveira@grifo.com', 36, 'Pernambuco', 'Rua Silvino Ribeiro de Melo', 'Casa Caiada', 'Olinda', 167, 3400.00),
    ('Maria Alessandra de Souza', 'mariasouza@grifo.com', 37, 'Pernambuco', 'Rua Silvino Ribeiro de Melo', 'Casa Caiada', 'Olinda', 128, 3400.00),
    ('Maria do Rosário Bispo', 'mariabispo@grifo.com', 38, 'Pernambuco', 'Rua Silvino Ribeiro de Melo', 'Casa Caiada', 'Olinda', 176, 3400.00),
    ('Maria do Rosário Nunes Lopes da Silva', 'mariasilva@grifo.com', 39, 'Pernambuco', 'Rua Silvino Ribeiro de Melo', 'Casa Caiada', 'Olinda', 78, 3400.00),
    ('Maria Fabiana da Silva Vasconcelos', 'mariavasconcelos@grifo.com', 40, 'Pernambuco', 'Rua Silvino Ribeiro de Melo', 'Casa Caiada', 'Olinda', 30, 3400.00),
    ('Maria Goretti de A. Carvalho', 'mariagoretti@grifo.com', 41, 'Pernambuco', 'Rua Silvino Ribeiro de Melo', 'Casa Caiada', 'Olinda', 327, 3400.00),
    ('Mário Francisco Martins Swenson', 'mariomartins@grifo.com', 42, 'Pernambuco', 'Rua Joaquim Antônio de Medeiros', 'Casa Caiada', 'Olinda', 96, 3400.00);
    
INSERT INTO Administrativo (fk_Funcionario_id_funcionario, cargo)
VALUES 
    (2, 'Contabilista'),
    (3, 'Coordenação de Equipes'),
    (4, 'Coordenação'),
    (5, 'Coordenação de Equipes'),  
    (6, 'Secretaria'),
    (7, 'Recursos Humanos'),
    (8, 'Coordenação de Equipes');

INSERT INTO Obra (nome, artista_original, movimento_artistico, dimensoes, img)
VALUES 
    ('Mona Lisa', 'Leonardo da Vinci', 'Renascimento', '77 cm x 53 cm', 'https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg'),
    ('A Noite Estrelada', 'Vincent van Gogh', 'Pós-Impressionismo', '73.7 cm x 92.1 cm', 'https://i.pinimg.com/originals/64/9d/68/649d686098b886ba98e6a76befbffa7e.jpg'),
    ('Guernica', 'Pablo Picasso', 'Cubismo', '349.3 cm x 776.6 cm', 'https://th.bing.com/th/id/OIP.Y9h3IwdUer3CC3Dey9z_0QHaDd?rs=1&pid=ImgDetMain'),
    ('A Persistência da Memória', 'Salvador Dalí', 'Surrealismo', '24 cm x 33 cm', 'https://th.bing.com/th/id/OIP.kI_cbCh6HYSMUqfFAHtK1QAAAA?rs=1&pid=ImgDetMain'),
    ('A Última Ceia', 'Leonardo da Vinci', 'Renascimento', '460 cm x 880 cm', 'https://veja.abril.com.br/wp-content/uploads/2016/06/ultima-ceia-leonardo-da-vinci-original.jpeg?quality=70&strip=info'),
    ('O Pensador', 'Auguste Rodin', 'Escultura Moderna', '181 cm x 98 cm x 63 cm', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Paris_2010_-_Le_Penseur.jpg/1200px-Paris_2010_-_Le_Penseur.jpg'),
    ('Vitória de Samotrácia', 'Desconhecido', 'Escultura Helenística', '245 cm x 220 cm x 150 cm', 'https://i.pinimg.com/originals/54/47/12/544712bf853490c69a29a4332bf9123f.jpg'),
    ('O Beijo', 'Auguste Rodin', 'Escultura Moderna', '180 cm x 105 cm x 110 cm', 'https://th.bing.com/th/id/OIP.WPHZ82OntRjPvWDJ4T47rgHaJj?rs=1&pid=ImgDetMain'),
    ('David', 'Michelangelo', 'Renascimento', '520 cm x 203 cm', 'https://www.historycrunch.com/uploads/4/1/1/6/41169839/michelangelo-david_3_orig.jpg'),
    ('O Discóbolo', 'Míron', 'Escultura Clássica Grega', '153 cm x 73 cm', 'https://lasesculturas.com/wp-content/uploads/2019/08/escultura-discobolo.jpg'),
    ('Igreja da Ordem Terceira de São Francisco', 'Desconhecido', 'Barroco', '77 m x 243 m x 780 m', 'https://acervodigital.unesp.br/bitstream/unesp/252188/2/mg_iotsf_002.JPG'),
    ('Igreja de São Pedro dos Clérigos', 'Desconhecido', 'Barroco', '77 m x 243 m x 780 m', 'https://i.pinimg.com/originals/f7/ae/40/f7ae408efeffbc8f1b688f749f247f15.jpg'),
    ('Igreja Matriz de Santo Antônio', 'Desconhecido', 'Barroco', '77 m x 243 m x 780 m', 'https://th.bing.com/th/id/R.bf7c0dcca714f62ac8d42656b432d1df?rik=7kMoxdWo7ydkMQ&pid=ImgRaw&r=0'),
    ('Igreja da Madre de Deus', 'Desconhecido', 'Barroco', '77 m x 243 m x 780 m', 'https://th.bing.com/th/id/R.ee180c9c702ee5a6911659ba38e04ce5?rik=KYICbclwgmf6dA&pid=ImgRaw&r=0'),
    ('Igreja da Sé', 'Desconhecido', 'Barroco', '77 m x 243 m x 780 m', 'https://th.bing.com/th/id/OIP.dfn2CRz9GYNEykAr77zYTwHaE7?rs=1&pid=ImgDetMain');

INSERT INTO Bens_moveis (fk_Obra_id_obra, descricao)
VALUES
    (1, 'pintura a óleo sobre tela'), 
    (2, 'pintura a óleo sobre tela'),
    (3, 'pintura a óleo sobre tela'),
    (4, 'pintura a óleo sobre tela'), 
    (5, 'mural pintado a fresco'), 
    (6, 'escultura em bronze'),
    (7, 'escultura em mármore'),
    (8, 'escultura em bronze'), 
    (9, 'escultura em mármore'),
    (10, 'escultura em mármore');


INSERT INTO Bens_imoveis (fk_Obra_id_obra, estado, rua, bairro, cidade, numero)
VALUES
    (11, 'Pernambuco', 'R. do Imperador Pedro II', 'Santo Antônio', 'Recife', 100),
    (12, 'Pernambuco', 'Centro', 'São José','Recife', 100),
    (13, 'Pernambuco', 'Praça da Independência', 'Santo Antônio', 'Recife', 100),
    (14, 'Pernambuco', 'Rua Madre de Deus', 'Recife', 'Recife', 100),
    (15, 'Pernambuco', 'Alto da Sé', 'Carmo', 'Recife', 100);

INSERT INTO Coordena(fk_Funcionario_coordenador, fk_Funcionario_coordenado)
VALUES
    (1, 1);

INSERT INTO Restaurador (fk_Funcionario_id_funcionario, descricao_treinamento, tempo_experiencia)
VALUES
    (9, 'pinturas a óleo', '3 anos'),
    (10, 'pinturas a óleo', '3 anos'),
    (11, 'pinturas a óleo', '3 anos'),
    (12, 'pinturas a óleo', '5 anos'),
    (13, 'pinturas a óleo', '3 anos'),
    (14, 'pinturas a óleo', '9 anos'),
    (15, 'pinturas a óleo', '3 anos'),
    (16, 'pinturas a óleo', '8 anos'),
    (17, 'esculturas em mármore', '3 anos'),
    (18, 'esculturas em mármore', '2 anos'),
    (19, 'esculturas em mármore', '3 anos'),
    (20, 'esculturas em mármore', '7 anos'),
    (21, 'esculturas em mármore', '3 anos'),
    (22, 'esculturas em mármore', '3 anos'),
    (23, 'esculturas em mármore', '5 anos'),
    (24, 'esculturas em mármore', '3 anos'),
    (25, 'esculturas em mármore', '3 anos'),
    (26, 'esculturas em mármore', '2 anos'),
    (27, 'esculturas em mármore', '3 anos'),
    (28, 'esculturas em mármore', '7 anos'),
    (29, 'esculturas em mármore', '3 anos'),
    (30, 'esculturas em mármore', '3 anos'),
    (31, 'esculturas em mármore', '5 anos'),
    (32, 'esculturas em mármore', '3 anos'),
    (33, 'esculturas em mármore', '3 anos'),
    (34, 'esculturas em mármore', '2 anos'),
    (35, 'pinturas a óleo', '3 anos'),
    (36, 'pinturas a óleo', '7 anos'),
    (37, 'pinturas a óleo', '3 anos'),
    (38, 'escultura em bronze', '3 anos'),
    (39, 'escultura em bronze', '5 anos'),
    (40, 'escultura em bronze', '3 anos'),
    (41, 'escultura em bronze', '3 anos'),
    (42, 'escultura em bronze', '3 anos');

INSERT INTO Restaura_Obra_Restaurador_Orcamento (fk_Obra_id, fk_cod_orcamento, fk_id_restaurador)
VALUES 
    (1, 2, 40),
    (2, 1, 34),
    (3, 3, 25),
    (4, 4, 12),
    (5, 5, 15),
    (6, 6, 17),   
    (7, 7, 19),
    (8, 8, 24),
    (9, 9, 27),
    (10, 10, 29),
    (11, 11, 18),
    (12, 12, 11),
    (13, 13, 35),
    (14, 14, 32),
    (15, 15, 25);

INSERT INTO Ficha_tecnica(data_inicio_obra, data_termino_obra, analise, empresa_prestadora_de_servico, descricao, tecnica_restauracao, fk_id_restauracao)
VALUES
 ('2023-02-24', '2023-06-01', 'reforço de pintura', '', 'descricao', 'pintura a óleo', 4), 
 ('2023-05-24', '2023-09-01', 'reforço de pintura', '', 'descricao', 'marmore', 5);

-- Adicione uma nova coluna para armazenar as senhas
ALTER TABLE Funcionario
ADD COLUMN senha VARCHAR(5);

-- Atualize a tabela para incluir senhas aleatórias
UPDATE Funcionario
SET senha = SUBSTRING(MD5(RAND()) FROM 1 FOR 5);