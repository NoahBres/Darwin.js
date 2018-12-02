import GenericChromosome from "./chromosomes/GenericChromosome";

export function singlePoint(
  parent1: GenericChromosome<any>,
  parent2: GenericChromosome<any>,
  index: number
): GenericChromosome<any>[] {
  const child1 = parent1.duplicate();
  const child2 = parent2.duplicate();

  const crossoverPoint = index;

  child1.genes = [
    ...parent1.genes.slice(0, crossoverPoint),
    ...parent2.genes.slice(crossoverPoint)
  ];
  child2.genes = [
    ...parent2.genes.slice(0, crossoverPoint),
    ...parent1.genes.slice(crossoverPoint)
  ];

  return [child1, child2];
}

export function singlePointCross(
  parent1: GenericChromosome<any>,
  parent2: GenericChromosome<any>
): GenericChromosome<any>[] {
  return singlePoint(
    parent1,
    parent2,
    Math.floor(Math.random() * parent1.genes.length)
  );
}

export function twoPoint(
  parent1: GenericChromosome<any>,
  parent2: GenericChromosome<any>,
  index1: number,
  index2: number
): GenericChromosome<any>[] {
  const child1 = parent1.duplicate();
  const child2 = parent2.duplicate();

  let crossoverPoint1 = index1;
  let crossoverPoint2 = index2;

  if (crossoverPoint1 > crossoverPoint2) {
    [crossoverPoint1, crossoverPoint2] = [crossoverPoint2, crossoverPoint1];
  }

  child1.genes = [
    ...parent1.genes.slice(0, crossoverPoint1),
    ...parent2.genes.slice(crossoverPoint1, crossoverPoint2),
    ...parent1.genes.slice(crossoverPoint2)
  ];
  child2.genes = [
    ...parent2.genes.slice(0, crossoverPoint1),
    ...parent1.genes.slice(crossoverPoint1, crossoverPoint2),
    ...parent2.genes.slice(crossoverPoint2)
  ];

  return [child1, child2];
}

export function twoPointCross(
  parent1: GenericChromosome<any>,
  parent2: GenericChromosome<any>
): GenericChromosome<any>[] {
  return twoPoint(
    parent1,
    parent2,
    Math.floor(Math.random() * parent1.genes.length),
    Math.floor(Math.random() * parent2.genes.length)
  );
}

export function uniformCross(
  parent1: GenericChromosome<any>,
  parent2: GenericChromosome<any>
): GenericChromosome<any>[] {
  const genes1 = [...parent1.genes];
  const genes2 = [...parent2.genes];

  const child1 = parent1.duplicate();
  const child2 = parent2.duplicate();

  for (let i = 0; i < genes1.length; i++) {
    if (Math.random() >= 0.5) {
      const temp = genes1[i];
      genes1[i] = genes2[i];
      genes2[i] = temp;
    }
  }

  child1.genes = genes1;
  child2.genes = genes2;

  return [child1, child2];
}

export function arithmeticBlend(
  parent1: GenericChromosome<number>,
  parent2: GenericChromosome<number>
): GenericChromosome<any>[] {
  const child1 = parent1.duplicate();
  const child2 = parent2.duplicate();

  const newGenes = [];

  for (let i = 0; i < child1.length; i++) {
    newGenes[i] = (child1.genes[i] + child2.genes[i]) / 2;
  }

  child1.genes = newGenes;
  child2.genes = newGenes;

  return [child1, child2];
}
