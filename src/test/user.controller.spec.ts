import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../crud/crud.controller';
import { UserService } from "../crud/crud.service";

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1, name: 'Test User' }),
            findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test User' }]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test User' }),
            update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated User' }),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  it('create вызывает service.create', async () => {
    const dto = { name: 'Test User' };
    expect(await controller.create(dto as any)).toEqual({ id: 1, name: 'Test User' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findAll вызывает service.findAll', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, name: 'Test User' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne вызывает service.findOne', async () => {
    expect(await controller.findOne('1')).toEqual({ id: 1, name: 'Test User' });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('update вызывает service.update', async () => {
    const dto = { name: 'Updated User' };
    expect(await controller.update('1', dto as any)).toEqual({ id: 1, name: 'Updated User' });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('remove вызывает service.remove', async () => {
    expect(await controller.remove('1')).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
