import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
from urllib.parse import urlparse
from PIL import Image
import requests
import re
import os
from urllib.parse import urljoin
from urllib.parse import unquote
import random

urlgoto='https://www.mesalva.com/app/conteudos/enem2023ing01'
materia = 'LC'
ano = '2023Regular'
total = 50

products = []

def processContents(content):
    html_content = content.get_attribute('outerHTML')

    # Encontrar todas as tags de imagem <img>
    img_tags = re.findall(r'<img .*?src="(.*?)"', html_content)


    # Criar um diretório para salvar as imagens localmente
    if not os.path.exists('imagens'):
        os.makedirs('imagens')

    for img_src in img_tags:
        # Decodificar a URL
        decoded_img_src = unquote(img_src)
        
        # Obter os dados da imagem
        response = requests.get(decoded_img_src)
        if response.status_code == 200:
            # Extrair o nome do arquivo da URL
            parsed_url = urlparse(decoded_img_src)
            filename = os.path.basename(parsed_url.path)
            
            # Salvar a imagem localmente
            image_path = os.path.join('imagens', filename)
            with open(image_path, 'wb') as f:
                f.write(response.content)
            
            # Construir o novo caminho da imagem relativo ao diretório criado
            new_img_src = urljoin('https://raw.githubusercontent.com/NiedsonEmanoel/CDN_ENEMASTER/main/EnemasterParts/', filename)
            
            # Substituir o valor do atributo src pelo novo caminho local
            html_content = str(html_content).replace(img_src, new_img_src).replace('class="dangerous-html"', '').replace('<div >', '<div>')

    return html_content

service = Service()
options = webdriver.ChromeOptions()

driver = webdriver.Chrome(service=service, options=options)


initialUrl: str = 'https://www.mesalva.com/app/entrar'
driver.get(initialUrl)
elemento_email = driver.find_elements(by=By.CLASS_NAME, value="field__input")[0]
elemento_senha = driver.find_elements(by=By.CLASS_NAME, value="field__input")[1]

elemento_email.clear()
elemento_senha.clear()

elemento_email.send_keys("niedsonemanoeltbm@gmail.com")
elemento_senha.send_keys('Niedson1004')


botao = driver.find_element(by=By.ID, value="sign-in-button")
botao.click()

total = total+1

time.sleep(4)
driver.get(urlgoto)

for x in range(39, total):
    try:
        time.sleep(2)
        content = driver.find_elements(by=By.CLASS_NAME, value='dangerous-html')[0]

        body = processContents(content=content)
     
        buttonAa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[0]
        alternativeA = processContents(content=buttonAa)

        buttonA = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[0]

        buttonBa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[1]
        alternativeB = processContents(content=buttonBa)

        buttonB = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[1]

        buttonCa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[2]
        alternativeC = processContents(content=buttonCa)

        buttonC = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[2]

        buttonDa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[3]
        alternativeD = processContents(content=buttonDa)

        buttonD = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[3]

        buttonEa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[4]
        alternativeE= processContents(content=buttonEa)

        buttonE = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[4]

        random_button_index = random.randint(0, 4)
        time.sleep(2)
        try:
            if(random_button_index == 0):
                buttonA.click()
            elif(random_button_index == 1):
                buttonB.click()
            elif(random_button_index == 2):
                buttonC.click()
            elif(random_button_index == 3):
                buttonD.click()
            else:
                buttonE.click()
        except:
            time.sleep(2)
            if(random_button_index == 0):
                buttonA.click()
            elif(random_button_index == 1):
                buttonB.click()
            elif(random_button_index == 2):
                buttonC.click()
            elif(random_button_index == 3):
                buttonD.click()
            else:
                buttonE.click()

        time.sleep(1)
        try:
            buttonR = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[5]
            buttonR.click()
        except:
            time.sleep(4)
            buttonRa = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[5]
            buttonRa.click()
        time.sleep(1)
        buttonTa = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[5]
        buttonTa.click()

        preres = driver.find_elements(by=By.CLASS_NAME, value='dangerous-html')[6]
        prepreres = processContents(content=preres)
        resolucao = str(prepreres).replace('Resolução fornecida em parceria com Colégio Ari de Sá e SAS Plataforma de Educação.', '')

        bp = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer--is-correct')[0]
        certa = str(bp.text).split('\n')[0]

        title = str(driver.title).split('\xa0')[0]

        product = {
            'title': title,
            'order': x,
            'body': body,
            'A': alternativeA,
            'B': alternativeB,
            'C': alternativeC,
            'D': alternativeD,
            'E': alternativeE,
            'resposta': certa,
            'resolucao': resolucao
        }

        products.append(product)



        if(x!= (total-1)):
            try:
                time.sleep(3)
                buttonNext = driver.find_elements(by=By.TAG_NAME, value='a')[2]
                buttonNext.click()
            except:
                time.sleep(4)
                buttonNext = driver.find_elements(by=By.TAG_NAME, value='a')[2]
                buttonNext.click()
        time.sleep(5)
    except:
        time.sleep(10)
        content = driver.find_elements(by=By.CLASS_NAME, value='dangerous-html')[0]

        body = processContents(content=content)

        buttonAa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[0]
        alternativeA = processContents(content=buttonAa)

        buttonA = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[0]

        buttonBa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[1]
        alternativeB = processContents(content=buttonBa)

        buttonB = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[1]

        buttonCa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[2]
        alternativeC = processContents(content=buttonCa)

        buttonC = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[2]

        buttonDa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[3]
        alternativeD = processContents(content=buttonDa)

        buttonD = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[3]

        buttonEa = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer__content')[4]
        alternativeE= processContents(content=buttonEa)

        buttonE = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[4]

        random_button_index = random.randint(0, 4)
        time.sleep(2)
        try:
            if(random_button_index == 0):
                buttonA.click()
            elif(random_button_index == 1):
                buttonB.click()
            elif(random_button_index == 2):
                buttonC.click()
            elif(random_button_index == 3):
                buttonD.click()
            else:
                buttonE.click()
        except:
            time.sleep(2)
            if(random_button_index == 0):
                buttonA.click()
            elif(random_button_index == 1):
                buttonB.click()
            elif(random_button_index == 2):
                buttonC.click()
            elif(random_button_index == 3):
                buttonD.click()
            else:
                buttonE.click()

        time.sleep(1)
        try:
            buttonR = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[5]
            buttonR.click()
        except:
            time.sleep(4)
            buttonRa = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[5]
            buttonRa.click()
        time.sleep(1)
        buttonTa = driver.find_elements(by=By.CLASS_NAME, value='btn__content')[5]
        buttonTa.click()

        content = driver.find_elements(by=By.CLASS_NAME, value='dangerous-html')[6]
        resolucao=processContents(content=content)
        print(resolucao)
        resolucao = str(resolucao).replace('Resolução fornecida em parceria com Colégio Ari de Sá e SAS Plataforma de Educação.', '')
        
        try:
            bp = driver.find_elements(by=By.CLASS_NAME, value='exercise-answer--is-correct')[0]
            certa = str(bp.text).split('\n')[0]
        except:
            certa = 'X'

        title = str(driver.title).split('\xa0')[0]

        product = {
            'title': title,
            'order': x,
            'body': body,
            'A': alternativeA,
            'B': alternativeB,
            'C': alternativeC,
            'D': alternativeD,
            'E': alternativeE,
            'resposta': certa,
            'resolucao': resolucao
        }

        products.append(product)



        if(x!= (total-1)):
            try:
                time.sleep(3)
                buttonNext = driver.find_elements(by=By.TAG_NAME, value='a')[2]
                nxt = buttonNext.get_attribute('href')
                driver.get(str(nxt))
            except:
                time.sleep(4)
                buttonNext = driver.find_elements(by=By.TAG_NAME, value='a')[2]
                nxt = buttonNext.get_attribute('href')
                driver.get(str(nxt))
        time.sleep(5)

total = total-1
dfProducts = pd.DataFrame(products)
dfProducts.to_csv(f'{len(products)}_{materia}_{ano}.csv', encoding='utf-8', sep=',', decimal=',')
dfProducts.to_excel(f'{len(products)}_{materia}_{ano}.xlsx', index=False)