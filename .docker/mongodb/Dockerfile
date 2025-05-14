FROM mongo:8.0.3

ENV MONGO_REPLICA_PORT=27017
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_REPLICA_HOST=mongodb

CMD mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip_all & \
  sleep 5 && \
  mongosh --port $MONGO_REPLICA_PORT --eval "rs.initiate()" || echo 'Replica Set já iniciado'; \
  mongosh --port $MONGO_REPLICA_PORT --eval " \
    db.getSiblingDB('admin').createUser({ \
      user: '$MONGO_INITDB_ROOT_USERNAME', \
      pwd: '$MONGO_INITDB_ROOT_PASSWORD', \
      roles: [ { role: 'root', db: 'admin' } ] \
    });" || echo 'Usuário já criado'; \
  tail -f /dev/null



