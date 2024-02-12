import barcode
from barcode.writer import ImageWriter
import pandas as pd
import random
import time
import genanki
import os
from fpdf import FPDF
import requests
from PIL import Image
from io import BytesIO
import datetime
import string
import matplotlib.pyplot as plt
from wordcloud import WordCloud

#Definindo Classe do PDF de Saída
class PDF(FPDF):
    def header(self):
       self.image('../../../Public/Img/fundo.png', x=0, y=0, w=self.w, h=self.h, type='png')

    def add_my_link(self, x, y, txt, link):
        self.set_xy(x, y)
        self.set_text_color(0, 0, 0)
        self.set_font('Times', 'BI', 12)
        self.add_link()

        # obter a largura do texto
        w = self.get_string_width(txt) + 6  # adicione uma margem de 3 em cada lado

        # desenhar o retângulo em torno do texto
        self.set_fill_color(255, 112, 79)
        self.cell(w, 10, '', border=0, ln=0, fill=True, align='C', link=link)

        # adicionar o texto com o link
        self.set_xy(x, y)
        self.cell(w, 10, txt, border=0, ln=1, align='C', link=link)

    # Page footer
    def footer(self):
      if self.page_no() != 1:
        self.image("../../../Public/Img/EneMaster.png", x=90, y=283, h=10,type='png') # enemaster
        self.set_y(0)
        self.set_font('Arial', 'BI', 8)
        self.cell(0, 8, '     '+str(self.page_no()) + '/{nb}', 0, 0, 'C')

def questHab(dfResult_CN, flashname, flashstr):
    modelo = genanki.Model(
        187333333,
        'enemaster',
        fields=[
            {'name': 'MyMedia'},
            {'name': 'Questão'},
            {'name': 'Resposta'},
            {'name': 'Image'}
        ],
        templates=[
            {
                'name': 'Cartão 1',
                'qfmt': '<b>{{Questão}}</b><hr>{{MyMedia}}',
                'afmt': '{{FrontSide}}<br><hr><b>{{Resposta}}<hr></b></b>{{Image}}',
            },
        ])

    def toYoutube(textPrompt):
        try:
            search_query = "https://www.youtube.com/results?search_query=" + "+".join(textPrompt.split())
        except:
            search_query = 'N/A'
        return(search_query)

    def remover_caracteres_invalidos(texto):
        numAssc = 251
        try:
          caracteres_invalidos = [char for char in texto if ord(char) > numAssc]
          texto_substituido = ''.join('' if ord(char) > numAssc else char for char in texto)
          return texto_substituido
        except:
          print(f'  PSEUDO/ERRO CARACTERE: IGNORADO EM: remover_caracteres_invalidos(texto)\n       {datetime.datetime.now()}')
          return(texto)

    def Capa(dItens, pltName):
        todos_itens = ' '.join(s for s in dItens['OCRSearch'].apply(str).values)
        todos_itens = todos_itens.replace(';',  ' ').replace('/',  ' ')

        all_letters = list(string.ascii_lowercase + string.ascii_uppercase)

        stop_words = all_letters +  ['a', 'A', 'b', 'B', 'c', 'C', 'd','figura', 'D', 'e', 'E', 'v', 'err', 'nan','pela', 'ser', 'de', 'etc', '(s)', 'do', 'da', 'por', 'para', 'entre', 'se', 'um', 'até', 'ele', 'ela', 'qual', 'bem', 'só', 'mesmo', 'uma', 'um', 'mais', 'menos', 'outro', 'porque', 'por que', 'cada', 'muito', 'todo', 'foram', 'tem', 'meio', 'país', 'una', 'for',
                    'uma', 'na', 'su', 'with', 'no','estes','mesma', 'lá', 'that', 'vo' 'pela', 'pelo', 'h', 'H', 'CH', 'ao', 'com', 'que', 'em', 'dos', 'das', 'eu', 'lo', 'the', 'me', 'y', 'la', 'en', 'en', 'to', 'quem', 'and', 'sem', 'on', 'at', 'essa', 'sem', 'uso', 'esse', 'las', 'suas', 'el', 'poi', 'pai', 'doi', 'in', 'pois', 'con', 'of',
                    'ainda', 'não', 'o', 'a', 'os','mê','próximo', 'apresenta','quando', 'meu', 'acordo', 'grande', 'saída', 'dessa', 'as', 'deve', 'Além', 'cinco', 'nessa', 'conforme', 'contendo', 'interior', 'Disponível', 'disponível', 'ocorre', 'vezes', 'através', 'grupo', 'tipo', 'algumas', 'causa', 'considerando', 'essas', 'formação', 'so', 'SO', 'pessoa', 'utilizada', 'alguns', 'quais', 'fio', 'outras', 'só', 'exemplo', 'está', 'oo','isso', 'fonte', 'durante', 'onde', 'caso', 'será', 'pelos', 'Disponível', 'duas', 'dois', 'onde', 'podem', 'apresentam', 'alguma', 'outra', 'seja', 'menor', 'Após', 'Considere', 'partir' 'aq', 'etapa', 'três', 'vez', 'pelas', 'dia', 'nova', 'Acesso', 'veículo', 'seus', 'têm', 'quadro', 'parte', 'desses', 'alguma', 'alta', 'sendo', 'eles', 'outros', 'respectivamente', 'lhe', 'ficou','desse', 'pode', 'nas', 'nem', 'nos', 'nesse', 'apenas', 'n', 'esses', 'igual', 'estão', 'br', 'L', 'questão', 'e', 'texto', 'são', 'é', 'como', 'à', 'no', 'mai', 'seu', 'sua', 'mais', '.', 'ano', 'ma', 'ou', 'foi', 'sobre', 'às', 'aos', 'mas', 'há', 'seguinte', 'já', 'maior', 'era', 'desde', 'diferente', 'forma', 'também']

        wc = WordCloud(background_color='black',
                    stopwords=stop_words,
                    collocations=False,
                    colormap = 'copper',
                    width=2480, height=3508, contour_width=0)  # Defina a largura e altura desejadas

        wordcloud = wc.generate(todos_itens)

        # Plotar a nuvem de palavras
        plt.figure(figsize=(10, 10))  # Ajuste o tamanho da figura conforme necessário

        a4_width_inches = 8.27
        a4_height_inches = 11.69
        dpi = 300  # Ajuste a resolução conforme necessário

        # Criar a figura com o tamanho A4
        fig, ax = plt.subplots(figsize=(a4_width_inches, a4_height_inches), dpi=dpi)

        # Plotar a nuvem de palavras
        ax.imshow(wordcloud, interpolation='bilinear')
        ax.axis("off")

        # Salvar a figura em tamanho A4
        plt.savefig(f"{pltName}.png", bbox_inches='tight', pad_inches=0)

    def generate_random_number():
        # Obter o timestamp atual em segundos
        timestamp = int(time.time())

        # Definir o timestamp como semente para a função random
        random.seed(timestamp)

        # Gerar um número inteiro aleatório entre 0 e 100000
        return random.randint(0, 100000)
    
    
    leftRandon = generate_random_number()
    print(f'''
    ---------------------LOGS------------------------
    GEN_ANKI_PDF - ENEMASTER
        HORÁRIO INICIO: {datetime.datetime.now()}
        QTD_QUESTÕES: {len(dfResult_CN)}
        NOME ARQUIVO: {flashname}.pdf e {flashname}.apkg
        STRING FLASHCARD: {flashstr}
        NUM_RANDOM: {leftRandon}
    ''')
    dfResult_CN = dfResult_CN.query("IN_ITEM_ABAN == 0 and TP_LINGUA not in [0, 1]")

    cols_to_drop = ['TP_LINGUA', 'TX_MOTIVO_ABAN', 'IN_ITEM_ADAPTADO', 'NU_PARAM_A', 'NU_PARAM_B', 'NU_PARAM_C']
    dfResult_CN.drop(cols_to_drop, axis=1, inplace=True)
    dfResult_CN = dfResult_CN[dfResult_CN['IN_ITEM_ABAN'] == 0]
    
    Capa(dfResult_CN, str(leftRandon))
    dfResult_CN.sort_values('theta_065', ascending=True, inplace=True)
    dfResult_CN['indexacao'] = dfResult_CN.reset_index().index + 1

    # Criar um baralho para armazenar os flashcards
    baralho = genanki.Deck(
        leftRandon, # Um número aleatório que identifica o baralho
        flashstr 
    )

    # Criar uma lista para armazenar as informações dos flashcards
    flashcards = []

    # Percorrer as linhas do dataframe dfResult_CN
    for i in dfResult_CN.index:
        # Obter o nome do arquivo de imagem da questão
        imagem = str(dfResult_CN.loc[i, "CO_ITEM"]) + '.png'
        imagemQ = str(dfResult_CN.loc[i, "CO_ITEM"]) + '.gif'

        # Obter a resposta da questão
        resposta =str('Gabarito: ')+ str(dfResult_CN.loc[i, 'TX_GABARITO'])
        inic = "Q" + str(dfResult_CN.loc[i, "CO_POSICAO"]) + ':' + str(dfResult_CN.loc[i, "ANO"]) + ' - H' + str(dfResult_CN.loc[i, "CO_HABILIDADE"].astype(int)) + " - Proficiência: " + str(dfResult_CN.loc[i, "theta_065"].round(2))

        # Criar um flashcard com a imagem e a resposta
        flashcard = genanki.Note(
            model=modelo,
            fields=[inic, '<img src="https://cdn.enemaster.app.br/Banco%20de%20Itens/' + imagem + '"]', resposta,  '<img src="https://cdn.enemaster.app.br/Banco%20de%20Itens/Correcao/' + imagemQ + '"]']
        )

        # Adicionar o flashcard à lista de flashcards
        flashcards.append(flashcard)

    for flashcard in flashcards:
        baralho.add_note(flashcard)

    # Criar um pacote com o baralho e as imagens
    pacote = genanki.Package(baralho)

    pacote.write_to_file(f'{flashname}.apkg')

    pdf = PDF()
    pdf.alias_nb_pages()
    pdf.set_title(flashname)

    pdf.add_page()
    pdf.image(f"{leftRandon}.png", x=0, y=0, w=pdf.w, h=pdf.h, type='png')

    pdf.add_page()

    pdf.set_font('Times', 'B', 12)
    img_dir = f'bancoitens/'  # Diretório local para salvar as imagens

    # Criar diretório se não existir
    if not os.path.exists(img_dir):
        os.makedirs(img_dir)


    for i in dfResult_CN.index:
        strCN ="N"+str(dfResult_CN.loc[i, 'indexacao'])+" - Q" + str(dfResult_CN.loc[i, "CO_POSICAO"])+':'+str(dfResult_CN.loc[i, "ANO"]) + ' - H'+str(dfResult_CN.loc[i, "CO_HABILIDADE"].astype(int))+ " - Proficiência: " + str(dfResult_CN.loc[i, "theta_065"].round(2))
        if 'dtype:' in strCN:
            continue
        else:
            try:
                pdf.ln(15)  # adicionar espaço entre o texto e a imagem
                img_filename = f"{dfResult_CN.loc[i, 'CO_ITEM']}.png"
                img_path = os.path.join(img_dir, img_filename)

                codestr = f"{dfResult_CN.loc[i, 'CO_ITEM']}"

                img_pathax = os.path.join(img_dir, str('xa'+codestr))

                code128 = barcode.get("code128", codestr, writer=ImageWriter())
                filename = code128.save(img_pathax)
                img_pathax = img_pathax+'.png'

                # Verificar se a imagem já foi baixada
                if not os.path.exists(img_path):
                    url = 'https://cdn.enemaster.app.br/Banco%20de%20Itens/'+ str(dfResult_CN.loc[i, "CO_ITEM"]) + '.png'
                    response = requests.get(url)

                    with open(img_path, 'wb') as img_file:
                        img_file.write(response.content)

                # Abrir a imagem do diretório local
                with Image.open(img_path) as img:
                    img.thumbnail((160, 160))
                    width, height = img.size

                pdf.set_fill_color(255, 112, 79)
             #   pdf.ln(15)
                pdf.cell(0, 10, strCN, 0, 1, 'C', 1)
                pdf.ln(10)   # adicionar espaço entre o texto e a imagem

                # caCNular a posição y para centralizar a imagem
                y = pdf.get_y()

                # ajustar as coordenadas de posição e o tamanho da imagem
                pdf.image(img_path, x=pdf.w / 2 - width / 2, y=y, w=width, h=height)
                pdf.image(img_pathax, x=3, y=-3,  h=25) #w=45,
                pdf.image('coor.png', x=pdf.w / 2 - 50 / 2, y=(height+y+15), w=50, h=18)
                pdf.ln(10)

                link = toYoutube(remover_caracteres_invalidos(dfResult_CN.loc[i, "OCRSearch"]))
                pdf.add_my_link(170, 25, "RESOLUÇÃO", link)
                pdf.set_text_color(0, 0, 0)
                pdf.set_font('Times', 'B', 12)

                # adicionar quebra de página
                pdf.add_page()
            except FileNotFoundError:
                print(strCN)
                continue

    #GAB
    page_width = 190
    cell_width = 19
    max_cols = int(page_width / cell_width)

    # Junta as colunas do dataframe
    dfResult_CN['merged'] = dfResult_CN['indexacao'].astype(str) + ' - ' + dfResult_CN['TX_GABARITO']

    # Divide os dados em grupos de até max_cols colunas
    data = [dfResult_CN['merged'][i:i+max_cols].tolist() for i in range(0, len(dfResult_CN), max_cols)]

    # CaCNula a largura das células de acordo com o número de colunas
    cell_width = page_width / max_cols

    # Cria a tabela
    pdf.set_fill_color(89, 162, 165)
    # Title
    pdf.ln(15)
    pdf.cell(0, 10, str('GABARITO '+flashname.upper()), 0, 1, 'C', 1)
    pdf.ln(10)
    pdf.set_font('Arial', 'B', 12)

    for row in data:
        for col in row:
            pdf.cell(cell_width, 10, col, 1, 0, 'C')
        pdf.ln() # quebra de linha para a próxima linha da tabela

    pdf.ln(5)
    pdf.set_font('Arial', 'BI', 8)

    os.remove(f"{leftRandon}.png")

    strOut = str(flashname)+ '.pdf'

    pdf.output(strOut, 'F')
    print(f'    HORÁRIO FIM: {datetime.datetime.now()}\n--------------------------CONCLUIDO---------------------\n\n')

    return str(flashname)


dItens = pd.read_csv("../../../Modules/gerador/provasOrdernadasPorTri.csv", encoding='utf-8', decimal=',')


dItens = dItens[dItens['SG_AREA'] == 'LC']
dItens = dItens[dItens['CO_HABILIDADE'] == 2]
lt = questHab(dItens, 'H2', 'Questões::H2')