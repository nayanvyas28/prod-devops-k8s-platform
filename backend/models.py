from sqlalchemy import Column, Integer, String, Boolean
from database import Base
from pydantic import BaseModel

# SQLAlchemy Model
class Server(Base):
    __tablename__ = "servers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    ip_address = Column(String)
    status = Column(String, default="stopped")

# Pydantic Schemas
class ServerBase(BaseModel):
    name: str
    ip_address: str
    status: str = "stopped"

class ServerCreate(ServerBase):
    pass

class ServerResponse(ServerBase):
    id: int

    class Config:
        orm_mode = True
