import 'react-native';
import React from 'react';
import Service from '../src/Service';

import renderer from 'react-test-renderer';

test('itens são embaralhados', () => {
	let a = [1,2,3,4,5,6,7,8,9,10];
	let b = Service.copiarArrayValor(a);
	expect(Service.embaralha(b)).not.toEqual(a);
});
