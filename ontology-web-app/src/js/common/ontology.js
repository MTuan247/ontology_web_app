export const useOntology = () => {

  const codeConfig = {
    key: {
      type: 'key',
      field: 'name'
    },
    subClassOf: {
      type: 'subClassOf',
      value: 'mobilePhone'
    },
    name: {

    },
    publishDate: {
    },
    status: {
      type: 'select',
    },
    SIm: {
      type: 'select'
    },
    bodyDimensions: {

    },
    bodyWeight: {

    },
    bodyBuild: {
      type: 'array'
    },
    displayType: {
      type: 'select'
    },
    displayDimensions: {

    },
    displayProtection: {

    },
    operatingSystem: {
      type: 'select'
    },
    chipset: {
      type: 'select'
    },
    CPU: {

    },
    cardSlot: {
      type: 'bool'
    },
    ramMemory: {
      
    },
    internalMemory: {
      type: 'array'
    },
    mainCameraResolution: {

    },
    mainCameraFeatures: {
      type: 'array'
    },
    mainCameraVideo: {
      type: 'array'
    },
    selfieCameraResolution: {

    },
    selfieCameraFeatures: {
      type: 'array'
    },
    selfieCameraVideo: {

    }

  }

  const generateCode = (model) => {
    let result = `@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    @prefix ex: <http://semweb.edu.vn/example#> .`

    let arrRs = [];

    let prefix = 'ex:';

    let value = '';

    for (let key in codeConfig) {
      let keyValue = codeConfig[key];
      if (model[key] == undefined || model[key] == null) {
        continue;
      }

      switch (keyValue.type) {
        case 'key':
          arrRs.push(prefix + model[keyValue.field.toLowerCase().replaceAll(' ', '-')] + ' a rdf:Class ; \n');
          break;
        case 'subClassOf':
          arrRs.push('rdfs:subClassOf ' + prefix + keyValue.value + ' ;\n');
          break;
        case 'date':
          break;
        case 'select':
          arrRs.push(prefix + key + ' ' + prefix + model[key] + ' ;\n');
          break;
        case 'array':
          if (Array.isArray(model[key])) {
            arrRs.push(prefix + key + ' ' + model[key]?.map(x => `"${x}"`)?.join(' , ') + ' ;\n');
          } else {
            let arr = model[key]?.split(',');
            arrRs.push(prefix + key + ' ' + arr?.map(x => `"${x}"`)?.join(' , ') + ' ;\n');
          }
          break;
        case 'bool':
          if (model[key]) {
            value = 'Yes'
          } else {
            value = 'No'
          }
          arrRs.push(prefix + key + ` "${value}"\n`);
          break;
        default:
          arrRs.push(prefix + key + ` "${model[key]}" ;\n`);
          break;
      }
    }

    result += arrRs.join('');

    return result
  }

  return {
    generateCode
  }
}