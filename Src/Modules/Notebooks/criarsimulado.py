# -*- coding: utf-8 -*-
"""CriarSimulado

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1f7lwuE2xHh4IzEwPxEiz7yy2aM7n49WQ
"""

Disciplina = "MT" # @param ["MT", "CH", "CN", "LC"]


import numpy as np
import pandas as pd
from fpdf import FPDF
import requests
from io import BytesIO
from PIL import Image
urlItens = "https://github.com/NiedsonEmanoel/NiedsonEmanoel/raw/main/enem/An%C3%A1lise%20de%20Itens/OrdenarPorTri/gerador/provasOrdernadasPorTri.csv"

dItens = pd.read_csv(urlItens, encoding='utf-8', decimal=',')

dItens = dItens[dItens['SG_AREA'] == Disciplina]
dItens = dItens[dItens['CO_HABILIDADE'].between(1, 30)]
dItens = dItens[dItens['IN_ITEM_ABAN'] == 0]

dItens.sort_values('theta_065', ascending=True, inplace=True)

if Disciplina == 'LC':
    dItens = dItens[~dItens['CO_HABILIDADE'].isin([5, 6, 7, 8])]

# Selecionar um item de cada habilidade de 1 a 30
habilidades_unicas = dItens.groupby('CO_HABILIDADE').sample(1)

# Selecionar os 12 itens restantes permitindo repetições, mas no máximo 3 repetições por habilidade
habilidades_repetidas = dItens.groupby('CO_HABILIDADE').apply(lambda x: x.sample(min(len(x), 3)))
habilidades_repetidas = habilidades_repetidas.sample(n=12, replace=True)

# Combinar os dataframes resultantes
resultado = pd.concat([habilidades_unicas, habilidades_repetidas])

# Obter as habilidades presentes no resultado atual
habilidades_presentes = resultado['CO_HABILIDADE'].unique()

# Verificar se todas as 30 habilidades estão presentes
if Disciplina != 'LC':
    if len(habilidades_presentes) < 30:
        # Calcular o número de habilidades faltantes
        habilidades_faltantes = np.setdiff1d(range(1, 31), habilidades_presentes)
        num_faltantes = 30 - len(habilidades_presentes)

        # Selecionar itens adicionais para as habilidades faltantes
        itens_faltantes = dItens[dItens['CO_HABILIDADE'].isin(habilidades_faltantes)].sample(n=num_faltantes, replace=True)

        # Combinar os itens faltantes com os resultados atuais
        resultado = pd.concat([resultado, itens_faltantes])

# Verificar o número de itens atual
num_itens = len(resultado)

# Remover itens extras se o número atual for maior que 45
if num_itens > 45:
    resultado = resultado.sample(n=45)

# Preencher com itens adicionais se o número atual for menor que 45
if num_itens < 45:
    num_adicionais = 45 - num_itens
    itens_adicionais = dItens.sample(n=num_adicionais, replace=True)
    resultado = pd.concat([resultado, itens_adicionais])

# Exibir o resultado
print('Proficiência QMaisDificil: '+str(resultado.max()['theta_065']))
print('')
print('Proficiência QMaisFacil: '+str(resultado.min()['theta_065']))

from matplotlib import pyplot as plt
import seaborn as sns
resultado.groupby('CO_PROVA').size().plot(kind='barh', color=sns.palettes.mpl_palette('Dark2'))
plt.gca().spines[['top', 'right',]].set_visible(False)

from matplotlib import pyplot as plt
import seaborn as sns
resultado.groupby('ANO').size().plot(kind='barh', color=sns.palettes.mpl_palette('Dark2'))
plt.gca().spines[['top', 'right',]].set_visible(False)

from matplotlib import pyplot as plt
import seaborn as sns
resultado.groupby('TX_GABARITO').size().plot(kind='barh', color=sns.palettes.mpl_palette('Dark2'))
plt.gca().spines[['top', 'right',]].set_visible(False)

from matplotlib import pyplot as plt

# Suponha que resultado['CO_HABILIDADE'] seja a sua série de dados
data = resultado['CO_HABILIDADE']

# Plotando o histograma com espaçamento entre as colunas
plt.hist(data, bins=20, edgecolor='black', rwidth=0.8)

# Definindo todos os valores de x como marcadores no eixo x
plt.xticks(data.unique(), rotation='vertical')

# Adicionando título e removendo as bordas superior e direita
plt.title('HABILIDADES')
plt.gca().spines[['top', 'right']].set_visible(False)

# Exibindo o gráfico
plt.show()

resultado.to_csv('simulado'+Disciplina+'.csv', index=False, encoding='utf-8', decimal=',')
resultado = resultado.sample(frac=1)

#Definindo Classe do PDF de Saída
class PDF(FPDF):
    def header(self):
        self.image('https://niedsonemanoel.com.br/enem/An%C3%A1lise%20de%20Itens/OrdenarPorTri/natureza/fundo.png', x=0, y=0, w=self.w, h=self.h, type='png')

    # Page footer
    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'BI', 8)
        # Page number
        self.cell(0, 12, 'Página ' + str(self.page_no()) + '/{nb}' + ' - Simulado por @niedson.studiesmed', 0, 0, 'C')

import os
from PIL import Image
from io import BytesIO
from fpdf import FPDF

def geraPDFSIMU(name, dfResult):
    dfResult['indexacao'] = dfResult.reset_index().index + 1
    pdf = FPDF()
    pdf.alias_nb_pages()
    pdf.set_title(name)

    pdf.add_page()

    pdf.set_font('Times', 'B', 12)
    strLC = ''
    img_dir = 'images/'  # Diretório local para salvar as imagens

    # Criar diretório se não existir
    if not os.path.exists(img_dir):
        os.makedirs(img_dir)

    for i in dfResult.index:
        if 'dtype:' in strLC:
            print("...")
        else:
            try:
                pdf.ln(15)
                pdf.ln(15)  # adicionar espaço entre o texto e a imagem
                img_filename = f"{dfResult.loc[i, 'CO_ITEM']}.png"
                img_path = os.path.join(img_dir, img_filename)

                # Verificar se a imagem já foi baixada
                if not os.path.exists(img_path):
                    url = 'https://niedsonemanoel.com.br/enem/An%C3%A1lise%20de%20Itens/OrdenarPorTri/1.%20Itens%20BNI_/'+ str(dfResult.loc[i, "CO_ITEM"]) + '.png'
                    response = requests.get(url)

                    with open(img_path, 'wb') as img_file:
                        img_file.write(response.content)
                        print(img_path)

                # Abrir a imagem do diretório local
                with Image.open(img_path) as img:
                    img.thumbnail((160, 160))
                    width, height = img.size

                y = pdf.get_y()

                pdf.image(img_path, x=pdf.w / 2 - width / 2, y=y, w=width, h=height)
                pdf.add_page()
            except FileNotFoundError:
                print("Arquivo de imagem não encontrado: " + str(dfResult.loc[i, "CO_ITEM"]) + '.png')
                print(strLC)
                continue

    # GAB
    page_width = 190
    cell_width = 63
    max_cols = int(page_width / cell_width)

    # Junta as colunas do dataframe
    dfResult['merged'] = dfResult['indexacao'].astype(str) + ': A[  ]  B[  ]  C[  ]  D[  ]  E[  ]'

    # Divide os dados em grupos de até max_cols colunas
    data = [dfResult['merged'][i:i+max_cols].tolist() for i in range(0, len(dfResult), max_cols)]

    # Calcula a largura das células de acordo com o número de colunas
    cell_width = page_width / max_cols

    # Cria a tabela
    pdf.set_fill_color(89, 162, 165)
    # Title
    pdf.ln(15)
    pdf.cell(0, 10, 'CARTÃO RESPOSTA', 0, 1, 'C', 1)
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 12)

    for row in data:
        for col in row:
            pdf.cell(cell_width, 10, col, 1, 0, 'C')
        pdf.ln() # quebra de linha para a próxima linha da tabela

    pdf.ln(5)
    pdf.set_font('Arial', 'BI', 8)

    strOut = name + '.pdf'

    pdf.output(strOut, 'F')
    return strOut

dSimu = pd.read_csv('simulado'+Disciplina+'.csv', encoding='utf-8', decimal=',')

tl = geraPDFSIMU(Disciplina, dSimu)

dSimu['TX_GABARITO']