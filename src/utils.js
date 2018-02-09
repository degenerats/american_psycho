export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const randomInt = (min, max) => {
	return Math.floor(min + Math.random() * (max + 1 - min));
}

export const randomItem = (array) => {
	return array[randomInt(0, array.length - 1)]
}

