# geth 인스턴스

## 구성
1. HOME_PATH: /var/lib/geth
2. 실행스크립트: HOME_PATH/bin/ [geth.sh | ropsten-geth.sh]
3. 로그경로: /var/log/geth/output.log (* AMI 로그 리다이렉트 설정이 안되어 있음.)
4. 권장 인스턴스 유형 t3.small


## 실행방법
### 스크립트 내용
* 메인넷
<pre>
<code>
geth --datadir /var/lib/geth/ --syncmode "full" --cache 512 --rpc --rpcvhosts "*" --rpcaddr 0.0.0.0 --rpcport 8545 --ws --wsaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,net,web3,txpool" >>/var/log/geth/output.log 2>&
</code>
</pre>

* ropsten
<pre>
<code>
geth --testnet --datadir /var/lib/geth/ --syncmode "full" --cache 128 --rpc --rpcvhosts "*" --rpcaddr 0.0.0.0 --rpcport 8545 --ws --wsaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,net,web3,txpool" >>/var/log/geth/output.log 2>&
</code>
</pre>

### 메인넷
- 시작: $ sudo systemctl start geth
- 종료: $ sudo systemctl stop geth

### Ropsten
- 시작: $ sudo systemctl start ropsten-geth
- 종료: $ sudo systemctl stop ropsten-geth


# ethereum-api

## 구성
1. index.html, request/index.html 두 페이지로 구성.
2. json-rpc는 rpc.json파일에 작성됨.


