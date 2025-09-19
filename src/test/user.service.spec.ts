import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../crud/crud.service';
import { User } from '../crud/model/entity';
import { Repository } from 'typeorm';


describe('UserService', () => {
  let service: UserService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get(getRepositoryToken(User));
  });

  it('create вызывает repo.create и repo.save', async () => {
    const dto = { name: 'Test' };
    const user = { id: 1, ...dto } as User;
    repo.create.mockReturnValue(user);
    repo.save.mockResolvedValue(user);

    expect(await service.create(dto as any)).toEqual(user);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(user);
  });

  it('findAll вызывает repo.find', async () => {
    const users = [{ id: 1, name: 'Test' }];
    repo.find.mockResolvedValue(users as User[]);
    expect(await service.findAll()).toEqual(users);
  });

  it('findOne вызывает repo.findOneBy', async () => {
    const user = { id: 1, name: 'Test' };
    repo.findOneBy.mockResolvedValue(user as User);
    expect(await service.findOne(1)).toEqual(user);
  });

  it('update вызывает repo.update и repo.findOneBy', async () => {
    const dto = { name: 'Updated' };
    const user = { id: 1, ...dto } as User;
    repo.findOneBy.mockResolvedValue(user);
    expect(await service.update(1, dto as any)).toEqual(user);
    expect(repo.update).toHaveBeenCalledWith(1, dto);
  });

  it('remove вызывает repo.remove', async () => {
    const user = { id: 1, name: 'Test' } as User;
    repo.findOneBy.mockResolvedValue(user);
    repo.remove.mockResolvedValue(user);
    expect(await service.remove(1)).toEqual(user);
  });
});
