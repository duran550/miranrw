import Image from "next/image";
import editIcon from "../../../../public/Edit.svg"
import showcon from '../../../../public/Add (1).svg';
import addIcon from '../../../../public/Add.svg';
import substractcon from '../../../../public/Subtract.svg';
import delIcon from '../../../../public/Delete.svg';
import settingIcon from '../../../../public/Settings.svg';
import closeIcon from '../../../../public/Dismiss.svg';
import searchIcon from '../../../../public/Search.svg';
import level1Icon from '../../../../public/Property 1=folder 1.svg';
import level2Icon from '../../../../public/Property 1=level 2.svg';
import level3Icon from '../../../../public/Property 1=level 3.svg';
import toast, { Toaster } from 'react-hot-toast';

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Level1Node from './types/Level1';
import Level2Node from './types/Level2';
import Level3Node from './types/Level3';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../forms/text-field/InputField';
import InputFieldCategorize from '../forms/text-field/InputFieldCategorize';
import { Spinner } from '@nextui-org/react';
import CategoryService from '@/services/categoryService';
import { CategoryType } from '@/utils/shared-types';
import { CategorizeContext } from "@/app/context/CategorizeContext";
import ReportContext from "@/app/[lang]/(dashboard)/common/context/ReportProvider";
import { AuthContext } from "@/app/context/AuthContext";
interface TreeNode {
  id: string;
  name: string;
  parent_id?: string;
  children: TreeNode[];
}
interface Tchildren {
  _id: string;
  name: string;
  parent: string;
  children: Tchildren[];
  createdAt: string;
  updatedAt: string;
}
interface TreeNode2 {
  _id: string;
  name: string;
  parent?: {
    _id: string;
    name: string;
    children: TreeNode2[];
  };
  level: string;
  children: TreeNode2[];
  createdAt: string;
  updatedAt: string;
}


const generateNodes2 = (
  deleteHandler: (value: string) => void,
  createHandler: (value: string) => void,
  tree: any[],
  nodes: Node[] = [],
  level = 1,
  positionY = 0,
  nextY = { value: 0 }
) => {
  // tree.forEach((category) => {
  //   const nodeId = category._id;
  //   const positionY = level * 150; // Espace entre les niveaux pour éviter le chevauchement vertical

  //   // Calculer la position X du nœud actuel
  //   const currentPositionX = nextX.value > positionX ? nextX.value : positionX;

  //   // Ajouter le nœud actuel
  //   nodes.push({
  //     id: nodeId,
  //     data: { label: category.name },
  //     position: { x: currentPositionX, y: positionY },
  //     type: `Level${level+1}`,
  //   });

  //   // Ajuster nextX pour les enfants
  //   nextX.value = currentPositionX + 150; // Espacement horizontal entre nœuds

  //   // Parcourir les enfants (sous-catégories)
  //   if (category.children && category.children.length > 0) {
  //     generateNodes2(
  //       category.children,
  //       nodes,
  //       level + 1,
  //       currentPositionX,
  //       nextX,

  //     );
  //   }
  // });
  //  let previewx = 0;
  //  let lastX = 0;
  //  tree.forEach((category) => {
  //    const nodeId = category._id;
  //    const positionX = (level - 1) * 280; // Espace entre les niveaux pour éviter le chevauchement horizontal

  //    // Calculer la position Y du nœud actuel
  //    const currentPositionY = nextY.value > positionY ? nextY.value : positionY;

  //    // Ajouter le nœud actuel avec le type correspondant au niveau
  //    nodes.push({
  //      id: nodeId,
  //      data: { label: category.name },
  //      position: { x: positionX, y:  currentPositionY  },
  //      type: `Level${level}`,
  //    });

  //    // Ajuster nextY pour les enfants
  //    nextY.value = previewx!=1 ? currentPositionY + 60 : currentPositionY; // Espacement vertical entre nœuds
  //    previewx = 0;
  //    lastX = 0;

  //    // Parcourir les enfants (sous-catégories)
  //    if (category.children && category.children.length > 0) {
  //      previewx = 1;
  //      lastX = currentPositionY;
  //      generateNodes2(
  //        category.children,
  //        nodes,
  //        level + 1,
  //        currentPositionY,
  //        nextY
  //      );
  //    }
  //  });

  tree.forEach((category) => {
    const nodeId = category._id;
    const positionX = (level - 1) * 280; // Espace entre les niveaux pour éviter le chevauchement horizontal

    // Calculer la position Y du nœud actuel
    const currentPositionY = nextY.value > positionY ? nextY.value : positionY;

    // Ajouter le nœud actuel avec le type correspondant au niveau
    nodes.push({
      id: nodeId,
      data: {
        label: category.name,
        ids: nodeId,
        delete: deleteHandler,
        create: createHandler,
      },
      position: { x: positionX, y: currentPositionY },
      type: `Level${level}`,
    });

    // Parcourir les enfants (sous-catégories)
    if (category.children && category.children.length > 0) {
      let firstChild = true;
      category.children.forEach((child: any) => {
        // Si c'est le premier enfant, il est aligné avec le parent
        const childY = firstChild ? currentPositionY : nextY.value;
        firstChild = false;

        // Ajouter le nœud de l'enfant avec son niveau
        nodes.push({
          id: child._id,
          data: {
            label: child.name,
            ids: child._id,
            delete: deleteHandler,
            create: createHandler,
          },
          position: { x: positionX + 280, y: childY },
          type: `Level${level + 1}`,
        });

        // Ajuster nextY pour les enfants suivants
        nextY.value = childY + 50;

        // Appel récursif pour les enfants de cet enfant
        generateNodes2(
          deleteHandler,
          createHandler,
          [child],
          nodes,
          level + 1,
          childY,
          nextY
        );
      });
    } else {
      // Mettre à jour nextY pour les nœuds de même niveau
      nextY.value = currentPositionY + 50;
    }
  });

  return nodes;
};
const generateNodes = (
  data: TreeNode[],
  level = 1,
  position = { x: 0, y: 0 },
  nodes: Node[] = [],
  parent?: string
): Node[] => {
  data.forEach((item, index) => {
    const node: Node = {
      id: item.id,
      data: { label: item.name },
      position: { x: position.x + level * 200, y: position.y + index * 100 },
      type: `Level${level}` as 'Level1' | 'Level2' | 'Level3',
    };

    nodes.push(node);

    if (item.children && item.children.length > 0) {
      generateNodes(
        item.children,
        level + 1,
        { x: position.x + level * 200, y: position.y + index * 100 },
        nodes,
        item.id
      );
    }
  });

  return nodes;
};
const generateGraph = (
  data: any[],
  level = 1,
  position = { x: 0, y: 0 },
  nodes: Node[] = [],
  edges: Edge[] = [],
  parent?: string
): { nodes: Node[]; edges: Edge[] } => {
  data.forEach((item, index) => {
    const nodeId = item._id;
    const node: Node = {
      id: nodeId,
      data: { label: item.name },
      position: { x: position.x + level * 200, y: position.y + index * 100 },
      type: `Level${level}` as 'Level1' | 'Level2' | 'Level3',
    };

    nodes.push(node);

    if (parent) {
      edges.push({
        id: parent + '-' + nodeId,
        source: parent,
        target: nodeId,
        type: 'step',
      });
    }

    if (item.children && item.children.length > 0) {
      generateGraph(
        item.children,
        level + 1,
        { x: position.x + level * 200, y: position.y + index * 100 },
        nodes,
        edges,
        nodeId
      );
    }
  });

  return { nodes, edges };
};

const generateArray = (array: any[]) => {
  let array_return: TreeNode2[] = [];
  array.map((item) => {
    if (!item.parent && item.level == 'level1') {
      array_return.push(item);
    }
  });
  array_return.map((item) => {
    item.children = [];
    array.map((items) => {
      if (
        items.parent &&
        items.parent?._id == item._id &&
        items.level == 'level2'
      ) {
        items.children = [];
        item.children.push(items);
      }
    });
  });

  array_return.map((items) => {
    items.children.map((items2) => {
      items2.children = [];
      array.map((items3) => {
        if (
          items3.parent &&
          items3.parent._id == items2._id &&
          items3.level == 'level3'
        ) {
          items3.children = [];
          items2.children.push(items3);
        }
      });
    });
  });

  return array_return;
};

type edges = {
  id: string;
  source: string;
  target: string;
  type: string;
};

export type IFormInput = {
  level1: string;
  level2: string;
  level3: string;
  search: string;
};
const { nodes: initialNodes, edges: initialEdges } = generateGraph([]);

const SettingViewer = () => {
  const {fillReportCategory} =useContext(CategorizeContext)
  const { setReports } = useContext(AuthContext);
  const mounted = useRef(false);
  const [arrayCat, setArrayCat] = useState<any[]>([]);
  const [arrayCatDb, setArrayCatDB] = useState<CategoryType[]>([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  const [stepLevel1Id, setstepLevel1Id] = useState('');
  const [stepLevel1Name, setstepLevel1Name] = useState('');
  const [stepLevel2Id, setstepLevel2Id] = useState('');
  const [stepLevel2Name, setstepLevel2Name] = useState('');

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const deleteHandler = async (id: string) => {
    setLoading(true);
    const categoryService = await new CategoryService();
    try {
      await categoryService.deleteCategory(id);
      setRefresh(true);
      toast.success('deleted');
      fillReportCategory([])
      setReports([])
    } catch (error) {
      toast.error('delete failed something went wrong');
    }
  };

  const createHandler = async (id: string) => {
    setShow2(id);
     
  };
   const getCategorie = async () => {
    try {
      const categoryService = new CategoryService();
      const arrayCategorie = await categoryService.getAllCategory();
      setArrayCatDB(arrayCategorie.data.categorys);
      setArrayCat(generateArray(arrayCategorie.data.categorys));
      let arrayedges: edges[] = [];
      const arrayDummit: any[] = await generateArray(
        arrayCategorie.data.categorys
      );
      arrayDummit.map((cat) => {
        cat.children.map((sous_cat1: any) => {
          arrayedges.push({
            id: cat.name + '-' + sous_cat1.name,
            source: cat._id,
            target: sous_cat1._id,
            type: 'step',
          });

          sous_cat1.children.map((sous_cat2: any) => {
            arrayedges.push({
              id: sous_cat1.name + '-' + sous_cat2.name,
              source: sous_cat1._id,
              target: sous_cat2._id,
              type: 'step',
            });
          });
        });
      });

      setEdges(arrayedges);

      let nextY = { value: 0 };
      const initialNodes = generateNodes2(
        deleteHandler,
        createHandler,
        arrayDummit,
        [],
        1,
        0,
        nextY
      );

      let uniqueTableau = initialNodes.filter(
        (element, index, self) =>
          index ===
          self.findIndex((obj) => obj.data.label === element.data.label)
      );
      setNodes(uniqueTableau);
      setLoading(false);
      console.log('arrayedges', arrayedges);
      console.log('arrayedgestab', uniqueTableau);
      console.log('arrayedgesinitialNodes', initialNodes);
    } catch (error) {
      toast.error('something went wrong');
    } finally {
    }
  };
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const nodeTypes = {
    Level1: Level1Node,
    Level2: Level2Node,
    Level3: Level3Node,
  };
  const {
    register,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<IFormInput>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });
  let level1 = watch('level1');
  let level2 = watch('level2');
  let level3 = watch('level3');
  let search = watch('search');

  const filterAray = useMemo(() => {
    let array: any[] = arrayCat;
    if (search) {
      array = arrayCat.filter((item: any) => item.name.includes(search));
    }
    return array;
  }, [search, arrayCat]);
  useEffect(() => {
    if (!mounted.current && !refresh) {
      getCategorie();
      mounted.current = true;
    }
    if (refresh) {
      getCategorie();
      setRefresh(false);
    }
  }, [refresh]);
  useEffect(() => {
    if (show2) {
      if (stepLevel1Name) {
        setValue('level1',stepLevel1Name)
      }

      if (stepLevel2Name) {
        setValue('level2', stepLevel2Name);
      }
    }
    if (!level1) {
      setValue('level2', '');
    }

    if (!level2) {
      setValue('level3', '');
    }
    const tempArray = arrayCat;
  }, [level1, level2, level3,stepLevel1Name,stepLevel1Name,show2]);
  useEffect(() => {
    
    if (show2.length > 0) {
console.log(arrayCatDb, 'arrayCatDb');
     
      const array = arrayCatDb.find((item) => item._id == show2);
      if (array) {
        if (array.level == 'level1') {
          setstepLevel1Name(array.name);
          setstepLevel1Id(show2);
        } else {
          setstepLevel2Name(array.name);
          setstepLevel2Id(show2);

          setstepLevel1Name(array.parent.name);
          setstepLevel1Id(array.parent._id);
        }
      }
   }
  },[show2])
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.level3) {
      let count = 1;
      setLoading(true);
      const arrayStep3 = data.level3.split(';');
      const categoriesService = new CategoryService();
      try {
       if (show2.length==0) {
         const id_livel1 = await categoriesService.createCategorie({
           name: data.level1,
           level: 'level1',
         });
         const id_livel2 = await categoriesService.createCategorie({
           name: data.level2,
           parent: id_livel1.data._id,
           level: 'level2',
         });

         // Attendre la résolution de toutes les promesses
         await Promise.all(
           arrayStep3.map(async (item) => {
             await categoriesService.createCategorie({
               name: item,
               parent: id_livel2.data._id,
               level: 'level3',
             });
             count += 1;
           })
         );
       } else {
         if (stepLevel2Id.length>0) {
           await Promise.all(
             arrayStep3.map(async (item) => {
               await categoriesService.createCategorie({
                 name: item,
                 parent: stepLevel2Id,
                 level: 'level3',
               });
               count += 1;
             })
           );
         } else {
             const id_livel2 = await categoriesService.createCategorie({
               name: data.level2,
               parent: stepLevel1Id,
               level: 'level2',
             });

             // Attendre la résolution de toutes les promesses
             await Promise.all(
               arrayStep3.map(async (item) => {
                 await categoriesService.createCategorie({
                   name: item,
                   parent: id_livel2.data._id,
                   level: 'level3',
                 });
                 count += 1;
               })
             );
         }
       }

        // Vérification après la résolution de toutes les promesses

        getCategorie();
        toast.success('created');

        reset();
      } catch (error) {
        setLoading(false);
        toast.error(
          'the creation process could not be completed an error occurred'
        );
      } finally {
        setLoading(false);
      }
    }

    if (!data.level3 && data.level2) {
      setLoading(true);
      const arrayStep3 = data.level3.split(';');
      const categoriesService = new CategoryService();
      try {
       if (show2.length==0) {
         const id_livel1 = await categoriesService.createCategorie({
           name: data.level1,
           level: 'level1',
         });
         const id_livel2 = await categoriesService.createCategorie({
           name: data.level2,
           parent: id_livel1.data._id,
           level: 'level2',
         });
       } else {
          const id_livel2 = await categoriesService.createCategorie({
            name: data.level2,
            parent: stepLevel1Id,
            level: 'level2',
          });
       }

        getCategorie();
        toast.success('created');

        reset();
      } catch (error) {
        toast.error(
          'the creation process could not be completed an error occurred'
        );

        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    if (!data.level2 && !data.level3) {
      setLoading(true);

      const arrayStep3 = data.level3.split(';');
      const categoriesService = new CategoryService();
      try {
        const id_livel1 = await categoriesService.createCategorie({
          name: data.level1,
          level: 'level1',
        });

        getCategorie();
        toast.success('created');

        reset();
      } catch (error) {
        setLoading(false);
        toast.error(
          'the creation process could not be completed an error occurred'
        );
      } finally {
        setLoading(false);
      }
    }
      setShow(false);
      setShow2('');
      setstepLevel1Id('');
      setstepLevel1Name('');
      setstepLevel2Id('');
      setstepLevel2Name('');
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {loading ? (
        <div className="h-[70vh] w-full flex flex-col items justify-center">
          <Spinner />
          <p className="text-center">Loding...</p>
        </div>
      ) : (
        <div className="w-full h-[95%] flex  lg:flex-row flex-col  justify-between gap-[0.5vw]">
          <div className="w-96 border h-96 overflow-y-auto bg-white min-h-[300px] p-2 rounded-lg shrink-0 flex flex-col gap-2 ">
            <p className="text-xl font-semibold ">Folder Structure</p>

            <InputFieldCategorize
              name="search"
              // type={issearchVisible ? 'text' : 'search'}
              id="search"
              placeholder="Search Categories"
              // disabled={false}
              icon={searchIcon}
              props={{
                ...register('search'),
              }}
            />
            {filterAray.map((item, index) => (
              <>
                <div
                  key={item._id}
                  onClick={() => {
                    if (item.children.length > 0 && step1 == item._id) {
                      setStep1('');
                      setStep2('');
                    } else {
                      setStep1(item._id);
                      setStep2('');
                    }
                  }}
                  className={`${
                    item.children.length > 0 && 'cursor-pointer'
                  }  ${index > 0 && 'mt-3'} flex  items-center`}
                >
                  <Image
                    src={
                      step1 == item._id || item.children.length == 0
                        ? substractcon
                        : showcon
                    }
                    alt=""
                  />

                  <Image src={level1Icon} alt="" className="mr-1 ml-2" />
                  {item.name}
                </div>
                {step1 == item._id &&
                  item.children.map((items: any) => (
                    <>
                      <div
                        key={items._id}
                        className={`${
                          items.children.length > 0 && 'cursor-pointer'
                        }   pl-8 flex items-center mt-1`}
                        onClick={() => {
                          if (step2 == items._id) {
                            setStep2('');
                          } else {
                            setStep2(items._id);
                          }
                        }}
                      >
                        <Image
                          src={
                            step2 == items._id || items.children.length == 0
                              ? substractcon
                              : showcon
                          }
                          alt=""
                        />

                        <Image src={level2Icon} alt="" className="mr-1 ml-2" />
                        {items.name}
                      </div>

                      {step2 == items._id &&
                        items.children.map((items2: any) => {
                          return (
                            <div
                              key={items2._id}
                              className="pl-[52px]  flex items-center mt-1"
                            >
                              <Image
                                src={level3Icon}
                                alt=""
                                className="mr-1 ml-2"
                              />
                              {items2.name}
                            </div>
                          );
                        })}
                    </>
                  ))}
              </>

              //
            ))}
          </div>
          <div className="lg:flex-grow  w-full border-2  settings flex flex-col overflow-hidden rounded-xl">
            <div className="w-full h-16 bg-white flex items-center justify-between px-2 text-sm text-white  gap-2">
              <div className="flex gap-1 items-center font-medium">
                {' '}
                <span className="p-1.5 bg-firstCat rounded-lg">Level 1</span>
                <span className="p-1.5 bg-secondCat rounded-lg">Level 2</span>
                <span className="p-1.5 bg-thirdCat rounded-lg">Level 3</span>
              </div>
              <div className=" flex gap-1 items-center pl-2">
                <Image
                  alt=""
                  src={addIcon}
                  className="cursor-pointer"
                  onClick={() => {
                    setShow(!show);
                    reset();
                  }}
                />
                <Image alt="" src={delIcon} className="cursor-pointer" />
                <Image alt="" src={editIcon} className="cursor-pointer" />
                <Image alt="" src={settingIcon} className="cursor-pointer" />
              </div>
            </div>
            <div className="overflow-scroll relative no-scrollbar lg:h-[calc(100vh-210px)] border h-[calc(100vh-410px)] w-full">
              <div
                className={`${
                  show || show2.length>0 ? 'block' : 'hidden'
                }  absolute top-2 right-2 min-w-[365px]  bg-white rounded-xl z-[20]  p-4 `}
              >
                <div className="w-full flex justify-between items-center">
                  <span className="text-xl font-semibold">Add new data</span>
                  <Image
                    src={closeIcon}
                    alt=""
                    className="cursor-pointer"
                    onClick={() => {
                     
                    
                      reset();
                       setShow(false);
                      setShow2('');
                        setstepLevel1Id('');
                        setstepLevel1Name('');
                        setstepLevel2Id('');
                        setstepLevel2Name('');
                    }}
                  />
                </div>
                <form
                  className="w-full flex flex-col gap-2 mt-2"
                  action=""
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <InputFieldCategorize
                    name="level1"
                    // type={islevel1Visible ? 'text' : 'level1'}
                    id="level1"
                    placeholder="Type level name"
                    // disabled={false}
                    title="Level 1"
                    props={{
                      ...register('level1', {
                        required: true,
                        minLength: 2,
                      }),
                    }}
                  />

                  <InputFieldCategorize
                    name="level2"
                    // type={islevel2Visible ? 'text' : 'level2'}
                    id="level2"
                    placeholder="Type level name"
                    // disabled={false}
                    title="Level 2"
                    props={{
                      ...register('level2', {
                        minLength: 2,
                      }),
                    }}
                  />

                  <InputFieldCategorize
                    name="level3"
                    // type={islevel3Visible ? 'text' : 'level3'}
                    id="level3"
                    placeholder="Type level name"
                    // disabled={false}
                    title="Level 3"
                    props={{
                      ...register('level3', {
                        minLength: 4,
                      }),
                    }}
                  />
                  <button
                    disabled={!isValid}
                    className={`${
                      !isValid && 'opacity-70'
                    } w-full rounded-xl bg-[#2B8049] py-3 font-bold text-white mt`}
                  >
                    save
                  </button>
                </form>
              </div>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  minZoom={0.1}
              >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
              </ReactFlow>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SettingViewer