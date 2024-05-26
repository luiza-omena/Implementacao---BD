use grifo;

create table Obra (
	id_obra int auto_increment primary key,
	nome varchar(80) not null,
	artista_original varchar(80) not null,
	movimento_artistico varchar(50) not null,
	dimensoes varchar(30) check(instr(dimensoes, 'x') > 0),
    img varchar(255)
);

create table Bens_moveis (
	fk_Obra_id_obra int primary key,
	descricao varchar(300),
	constraint id_obra_movel foreign key(fk_Obra_id_obra) references Obra(id_obra) on delete cascade
);

create table Bens_imoveis (
	fk_Obra_id_obra int primary key,
	estado varchar(30) not null,
	rua varchar(100) not null,
	bairro varchar(50) not null,
	cidade varchar(50) not null,
	numero int not null,
	constraint id_obra_imovel foreign key(fk_Obra_id_obra) references Obra(id_obra) on delete cascade
);

create table Telefone_cliente (
	telefone_Pk int auto_increment primary key,
	telefone varchar(15) unique
);

create table Cliente (
	id_cliente int auto_increment primary key,
	nome varchar(100),
	email varchar(50) unique check(instr(email, '@') > 0),
	fk_telefone_pk int,
	estado varchar(50),
	rua varchar(100),
	bairro varchar(50),
	cidade varchar(30),
	numero int,
	constraint telefone_cliente foreign key(fk_telefone_pk) references Telefone_cliente(telefone_pk) on delete cascade
);

create table Orcamento (
	cod_orcamento int auto_increment primary key,
	valor double check(valor > 0),
	prazo_entrega date not null,
	fk_Cliente_id_cliente int,
	constraint id_cliente foreign key(fk_Cliente_id_cliente) references Cliente(id_cliente) on delete cascade
);

create table Telefone_funcionario (
	telefone_Pk int auto_increment primary key,
	telefone varchar(15) unique
);

create table Funcionario (
	id_funcionario int auto_increment primary key,
	nome varchar(100),
	email varchar(50) unique check(instr(email, '@') > 0),
	fk_telefone_pk int,
	estado varchar(50),
	rua varchar(100),
	bairro varchar(50),
	cidade varchar(30),
	numero int,
	salario double check(salario > 0),
	constraint telefone_funcionario foreign key(fk_telefone_pk) references Telefone_funcionario(telefone_pk) on delete cascade
);

create table Administrativo (
	fk_Funcionario_id_funcionario int primary key,
	cargo varchar(30) not null,
	constraint fk_funcionario_adm foreign key(fk_Funcionario_id_funcionario) references Funcionario(id_funcionario) on delete cascade
);

create table Restaurador (
	fk_Funcionario_id_funcionario int primary key,
	descricao_treinamento varchar(100) not null,
	tempo_experiencia varchar(40), 
	constraint fk_funcionario_rest foreign key(fk_Funcionario_id_funcionario) references Funcionario(id_funcionario) on delete cascade
);

create table Coordena (
	fk_Funcionario_coordenador int,
	fk_Funcionario_coordenado int,
	constraint fk_funcionario_coordenador foreign key(fk_Funcionario_coordenador) references Funcionario(id_funcionario) on delete cascade,
	constraint fk_funcionario_coordenado foreign key(fk_Funcionario_coordenado) references Funcionario(id_funcionario) on delete cascade,
	primary key(fk_Funcionario_coordenador,fk_Funcionario_coordenado)
);

create table Restaura_Obra_Restaurador_Orcamento (
	id_restauracao int auto_increment primary key,
	fk_Obra_id int,
	fk_cod_orcamento int,
	fk_id_restaurador int,
	constraint fk_obra_id foreign key(fk_Obra_id) references Obra(id_obra) on delete cascade,
	constraint fk_cod_orcamento foreign key(fk_cod_orcamento) references Orcamento(cod_orcamento) on delete cascade,
	constraint fk_restaurador_id foreign key(fk_id_restaurador) references Restaurador(fk_Funcionario_id_funcionario) on delete cascade
);

CREATE TABLE Ficha_tecnica (
	cod_ficha int auto_increment primary key,
	data_inicio_obra date not null,
	data_termino_obra date not null,
	analise varchar(400),
	empresa_prestadora_de_servico varchar(100) default '',
	descricao varchar(500),
	tecnica_restauracao varchar(100),
	fk_id_restauracao int,
	constraint fk_id_restauracao foreign key(fk_id_restauracao) references Restaura_Obra_Restaurador_Orcamento(id_restauracao) on delete cascade
);