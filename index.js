const fs = require("fs");
const { translate } = require('free-translate');

// types of translation languages (from, to) are in ./localVariants.ts
const from = "ru"
const to = "en"


var jsonToTranslate = {
    // mainTree
    cancelChangeButton: "Отменить",
    saveButton: "Сохранить",
    saveAsButton: "Сохранить как",
    exportJsonButton: "Экспорт",
    historyChanges: "История изменений",
    fillVersionName: "Введите название конфигурации",
    cancel: "Отменить",
    create: "Создать",
    invalidJson: "Невалидный JSON. Должен присутствовать массив \"entities\".",
    importedJson: "Импортированный JSON",
    errorGetConfigListRequest: "Ошибка при получении списка конфигураций",
    errorUpdateConfigRequest: "Ошибка при обновлении конфигурации",
    errorCreateConfigRequest: "Ошибка при создании конфигурации",
    errorGetGroupListRequest: "Ошибка при получении списка групп",
    errorGetConfigRequest: "Ошибка при получении конфигурации",
    saved: "Сохранено",
    created: "Создано",
    emptyConfigNameError: "Название конфигурации не может быть пустым",
    emptyOperationsArrayError: "Массив операций не может быть пустым",
    // treeBranch/supportFunctions
    methodUniqualityError1: "Метод с типом ",
    methodUniqualityError2: " уже существует",
    periodError: "period должен быть в диапазоне от 20 до 1000",
    sizeError: "size должен быть в диапазоне от 9 до 25",
    methodUniqualityErrorOnEscDelete: "Нарушена уникальность метода. Восстановление невозможно.",
    // overlayLoading
    loading: "Загрузка...",
    // modalComponentCreate
    createTitle: "Создание",
    createSuccessButton: "Создать",
    createDiscardButton: "Отмена",
    createMethodUniqualityError: "Уже существует метод с типом ",
    createPeriodError: "period должен быть в диапазоне от 20 до 1000",
    createSizeError: "size должен быть в диапазоне от 9 до 25",
    // modalComponentCreate
    deleteTitle: "Удаление",
    deleteConfirm: "Вы действительно хотите удалить обьект?",
    deleteSuccessButton: "Удалить",
    deleteDiscardButton: "Отмена",
    deleteSystemPropertyError: "Нельзя удалить зарезервированное свойство",
    // loginModal
    signIn: "Войти",
    login: "Логин",
    password: "Пароль",
    // findModal
    findHint: "Введите подстроку для поиска",
    find: "Найти",
    // chooseJsonVersion
    chooseVersion: "Выберите конфигурацию",
    loadVersion: "Загрузить",
    // changesHistory
    changesHistoryTitle: "История изменений",
    changesHistoryType: "Тип:",
    changesHistoryTypeChange: "Изменение",
    changesHistoryTypeCreate: "Создание",
    changesHistoryTypeDelete: "Удаление",
    goToObject: "Перейти к обьекту",
    typeOfObject: "Тип обьекта:",
    uniqueObjectName: "Уникальное название объекта:",
    changedFields: "Измененные поля:",
    noChangesText: "Нет изменений",
    noName: "Поле не заполнено"
}
var arrFromJson = Object.keys(jsonToTranslate);
var arrFromJsonLength = arrFromJson.length;

console.log("\x1b[31m") // color console.log()
console.log("Translation started");

iterateArrFromJson(arrFromJson,jsonToTranslate,0,from,to)

async function iterateArrFromJson(arrFromJson, jsonToTranslate, index, from, to){
    var isBlankAtTheBeginning = jsonToTranslate[arrFromJson[index]][0]  === " ";
    var isBlankAtTheEnd = jsonToTranslate[arrFromJson[index]][jsonToTranslate[arrFromJson[index]].length - 1]  === " ";
    var tr = await translate(jsonToTranslate[arrFromJson[index]], { from, to });

    if(isBlankAtTheBeginning) tr = " " + tr;
    if(isBlankAtTheEnd) tr = tr + " ";
    jsonToTranslate[arrFromJson[index]] = tr;

    if(arrFromJson.length > index+1) {
        console.log("Translated: " + (index+1) + "/" + arrFromJsonLength);
        iterateArrFromJson(arrFromJson, jsonToTranslate, index+1, from, to);
    }
    else {
        console.log("Translated: " + (index+1) + "/" + arrFromJsonLength);
        console.log('Translation finished. Result in' + './translatedJson'+"From'"+from+"'To'"+to+'\'.json');
        fs.writeFileSync('./translatedJson'+"From'"+from+"'To'"+to+'\'.json', JSON.stringify(jsonToTranslate, null, 2));
    }
}

