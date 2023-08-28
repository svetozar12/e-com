package user

import (
	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/libs/api/entities"
)

func UserModel(user *entities.UserEntity) *pb.User {
	return &pb.User{Id: int32(user.ID), Email: user.Email, Fname: user.Fname, Lname: user.Lname}
}
