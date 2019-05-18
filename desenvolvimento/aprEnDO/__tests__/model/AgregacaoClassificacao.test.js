import AgregacaoClassificacao  from "../../src/model/AgregacaoClassificacao";

jest.mock('../../src/model/classificacao/ClasGeral', ()=>{
    
});

jest.mock('../../src/model/classificacao/ClassTipo', ()=>{
    
});

jest.mock('../../src/model/classificacao/ClassSeparavel', ()=>{
    
});

jest.mock('../../src/model/classificacao/ClassOrdem', ()=>{
  
});

jest.mock('../../src/model/classificacao/ClassLinearidade', ()=>{
    
});

jest.mock('../../src/model/classificacao/ClassHomog', ()=>{
    
});

jest.mock('../../src/model/classificacao/ClassExata', ()=>{
    
});

import ClassOrdem from '../../src/model/classificacao/ClassOrdem';
const {Response} = jest.requireActual('../../src/model/classificacao/ClassOrdem');

describe('myModule', () => {
    it('jairo', async() => {
      //dependency.default = jest.fn(); // Mutate the default export
      const agregagacao = new AgregacaoClassificacao("ordem");
      //a = await AgregacaoClassificacao.constructor("tipo");
      expect(soundPlayerConsumer.nome()).toBe("blue"); // Assert against the default
    });
  });
